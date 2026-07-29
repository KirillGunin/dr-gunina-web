# Задача: авторизация для админки (с заделом под пользователей)

Ветка: `issue/80`

## Контекст

Сейчас в проекте нет ни авторизации, ни store'ов, ни middleware. Фронт и API — один                                                                                                                                        
origin (dr-gunina.ru), это позволяет использовать httpOnly refresh-cookie без                                                                                                                                              
CORS-костылей. Бэкенд для auth ещё не реализован — контракт ниже согласован заранее                                                                                                                                        
и должен параллельно реализовываться в бэкенд-репозитории.

## API-контракт (зависимость от бэкенда)

- `POST /api/auth/login {email, password}` → `{access_token, user}` + `Set-Cookie: refresh_token` (httpOnly)
- `POST /api/auth/refresh` (cookie) → `{access_token}`
- `POST /api/auth/logout` (cookie) → 204
- `GET /api/auth/me` (Bearer access_token) → user
- `user.role: 'admin' | 'user'` — с первого дня, чтобы не мигрировать схему при появлении обычных юзеров.

## Решения, принятые по ходу обсуждения (отличаются от первичной формулировки)

- **Одна страница `/login` для всех**, не `/admin/login`. Эндпоинт логина не завязан                                                                                                                                       
  на роль — роль приходит в ответе и решает, куда пускать *после* входа. `/admin/*`                                                                                                                                        
  защищён миддлваром по роли, но точка входа для логина одна на всех. Редирект после                                                                                                                                       
  успеха: `route.query.redirect`, если есть (положит middleware), иначе — по роли                                                                                                                                          
  (`admin` → `/admin`, остальные → `/`, т.к. `/profile` пока нет).
- **Pinia ставим сразу**, не `useState` — корзина и личный кабинет пользователя уже                                                                                                                                        
  в роадмапе, `useAuth` пишется как Pinia setup-store с самого начала, чтобы потом не                                                                                                                                      
  переписывать. `access_token` — только в памяти стора (без persist-плагина), нигде                                                                                                                                        
  в cookie/localStorage.
- **Поле пароля** — готовый PrimeVue `<Password toggleMask :feedback="false">`                                                                                                                                             
  (auto-import), без ручного компонента с переключателем видимости.
- **i18n сразу в ru/en/es** — по образцу `forms.appointment` (полностью переведён),                                                                                                                                        
  а не `forms.review` (ru-only, не образец для копирования).
- **Отдельные layouts**: `layouts/blank.vue` для `/login`, `layouts/admin.vue` для                                                                                                                                         
  `/admin/*` — без публичного `AppHeader`/`AppFooter`. Первое использование                                                                                                                                                
  `definePageMeta({ layout })` в проекте, никакой существующей конвенции не ломает.

## Типы

- `app/types/user.ts` — уже существует (staged): `{ id, name, last_name, email, role }`.
- `app/types/auth.ts` (новый) — `LoginPayload { email, password }`,                                                                                                                                                        
  `LoginResponse { access_token, user: User }`, `RefreshResponse { access_token }`                                                                                                                                         
  (по аналогии с `types/reviews.ts`).
- `app/types/router.d.ts` (новый) — `declare module 'vue-router' { interface RouteMeta                                                                                                                                     
    { requiredRole?: User['role'] } }`, иначе `definePageMeta({ requiredRole })` не                                                                                                                                          
  типизируется в strict-режиме (прецедент — `types/ymaps3.d.ts`).

## API-слой

`app/api/auth.ts` — `login()`, `logout()`, `refresh()`, `fetchMe()`, по образцу                                                                                                                                            
`app/api/reviews.ts` (`useNuxtApp().$axios`, `.then(resolve).catch(reject)`).

**Важный нюанс:** на SSR нужно вручную прокидывать `cookie` из входящего запроса                                                                                                                                           
(`useRequestHeaders(['cookie'])`) в `refresh()`/`fetchMe()` — иначе первый серверный                                                                                                                                       
рендер защищённой страницы всегда будет видеть пользователя как не залогиненного,                                                                                                                                          
т.к. Nuxt не форвардит cookies браузера в исходящие axios-запросы сам по себе.

## Auth-состояние

`app/stores/auth.ts` — Pinia setup-store, экспортируется как `useAuth` (не                                                                                                                                                 
`useAuthStore` — сохраняем имя по спеке):                                                                                                                                                                                  
`user`, `accessToken` (state), `hasRole(role)`, `login()`, `logout()`, `fetchMe()`.

## Axios (`app/plugins/axios.ts`, доработка существующего)

- `withCredentials: true` — чтобы refresh-cookie уходил с запросами.
- request-interceptor (рядом с существующим Accept-Language) — подставлять                                                                                                                                                 
  `Authorization: Bearer <access_token>` из `useAuth()`.
- response-interceptor — на 401: если это не сам `/auth/refresh` и запрос ещё не                                                                                                                                           
  ретраился (`config._retry` guard) → вызвать refresh, обновить токен, повторить                                                                                                                                           
  исходный запрос один раз; при неудаче — очистить стор + редирект на `/login`.                                                                                                                                            
  Ретрай-логика 401 живёт только здесь — `fetchMe()` и `middleware/auth.ts` про неё                                                                                                                                        
  не знают, просто дергают API.

## Middleware

`app/middleware/auth.ts` — именованный (не global), принимает `meta.requiredRole`;                                                                                                                                         
если юзера нет — пробует `fetchMe()` (retry на 401 обеспечивает интерцептор), иначе                                                                                                                                        
редирект на `/login?redirect=...`; если роль не подходит — редирект на `/`.                                                                                                                                                
Вешается через `definePageMeta({ middleware: 'auth', requiredRole: 'admin' })`.

## Формы

- `app/components/forms/FormLogin.vue` — по образцу `FormReview.vue`, через                                                                                                                                                
  существующий `AppForm`: `:method="(data) => auth.login(data as LoginPayload)"`,                                                                                                                                          
  `AppField` + `AppInput` (email), `AppField` + `<Password>` (пароль), `AppButton`                                                                                                                                         
  submit с `:loading="sending"`.
- `app/components/forms/validationRules/formLoginRules.ts` — `useLoginRules(state)`:                                                                                                                                       
  `email: { required, email }`, `password: { required, minLength: minLength(6) }`.
- Попутный фикс в `useCustomRules.ts`: у правила `email` захардкожено русское                                                                                                                                              
  сообщение об ошибке — для мультиязычной формы логина это баг, нужно завести                                                                                                                                              
  `errors.common.email` и брать текст через i18n (как уже сделано для `phone`/`name`).

## Страницы

- `app/pages/login.vue` — `layout: 'blank'`, рендерит `FormLogin`, на успех —                                                                                                                                              
  редирект см. выше.
- `app/pages/admin/index.vue` — `layout: 'admin'`, `requiredRole: 'admin'`,                                                                                                                                                
  заглушка, подтверждающая что middleware/стор работают целиком.

## Layouts

- `app/layouts/blank.vue` — просто `<slot />`.
- `app/layouts/admin.vue` — минимальный шелл с кнопкой logout (`auth.logout()` →                                                                                                                                           
  `navigateTo('/login')`) + `<slot />`.

## i18n (ru/en/es — одинаковые ключи, переведённые)

- `forms.login`: `header`, `label-email`, `placeholder-email`, `label-password`,                                                                                                                                           
  `placeholder-password`, `action`.
- `errors.common.email` (новый ключ, см. фикс выше).

## Вне скоупа

- Сам бэкенд auth-эндпоинтов (отдельная задача/репозиторий).
- Регистрация и профиль обычных пользователей — архитектура заложена (`role`,                                                                                                                                              
  параметризованный middleware, переиспользуемый `useAuth`), но `/register` и                                                                                                                                              
  `/profile` не создаются сейчас.

## Проверка (когда бэкенд будет готов / на моках)

1. Незалогиненный заход на `/admin` → редирект на `/login?redirect=/admin`.
2. Успешный логин → редирект обратно на `/admin`, страница рендерится.
3. Hard refresh на `/admin` → сессия не теряется (silent refresh по httpOnly cookie).
4. Logout из `admin.vue` → редирект на `/login`, `/admin` снова недоступен.
5. В Network: на 401 — ровно один `/auth/refresh` и один повтор исходного запроса,                                                                                                                                         
   без зацикливания. 