const project = () => import('./pages/AntdPro/models/project');
const list = () => import('./pages/AntdPro/models/list');
const chart = () => import('./pages/AntdPro/Dashboard/models/chart');
const activities = () => import('./pages/AntdPro/Dashboard/models/activities');
const monitor = () => import('./pages/AntdPro/Dashboard/models/monitor');
const form = () => import('./pages/AntdPro/Forms/models/form');
const rule = () => import('./pages/AntdPro/List/models/rule');
const profile = () => import('./pages/AntdPro/Profile/models/profile');

export default [
    // user
    {
        path: '/user',
        component: () => import('./layouts/UserLayout'),
        routes: [
            {path: '/user', redirect: '/user/login'},
            {path: '/user/login', name: 'login', component: () => import('./pages/User/Login')},
            {
                name: 'register',
                path: '/user/register',
                models: () => [import('./pages/User/models/register')],
                component: () => import('./pages/User/Register')
            },
            {
                name: 'register.result',
                path: '/user/register-result',
                component: () => import('./pages/User/RegisterResult'),
            },
        ],
    },
    {
        path: '/',
        models: [project],
        component: () => import('./layouts/BasicLayout'),
        Routes: [require('./pages/Authorized').default],
        authority: ['admin', 'user'],
        routes: [
            {
                name: 'demo',
                path: '/demo',
                icon: 'appstore',
                routes: [
                    {path: '/demo', redirect: '/demo/counter'},
                    {
                        name: 'counter',
                        path: '/demo/counter',
                        models: () => [import('./pages/Demo/models/counter')],
                        component: () => import('./pages/Demo/Counter'),
                    },
                    {
                        name: 'randomuser',
                        path: '/demo/random-user',
                        models: () => [import('./pages/Demo/models/randomUser')],
                        component: () => import('./pages/Demo/RandomUser'),
                    },
                    {
                        name: 'apiclient',
                        path: '/demo/api-client',
                        component: () => import('./pages/Demo/ApiClient'),
                    },
                    {
                        name: 'form',
                        path: '/demo/form',
                        models: () => [import('./pages/Demo/models/demo')],
                        component: () => import('./pages/Demo/BasicForms'),
                    },
                    {
                        name: 'history',
                        path: '/demo/history',
                        component: () => import('./pages/Demo/HistoryDemo'),
                    },
                ]
            },
            // dashboard
            {
                name: 'dashboard',
                path: '/antd-pro/dashboard',
                icon: 'dashboard',
                models: [project, monitor],
                routes: [
                    {path: '/antd-pro', redirect: '/antd-pro/dashboard/analysis'},
                    {
                        name: 'analysis',
                        path: '/antd-pro/dashboard/analysis',
                        component: () => import('./pages/AntdPro/Dashboard/Analysis'),
                    },
                    {
                        name: 'monitor',
                        path: '/antd-pro/dashboard/monitor',
                        component: () => import('./pages/AntdPro/Dashboard/Monitor'),
                    },
                    {
                        name: 'workplace',
                        path: '/antd-pro/dashboard/workplace',
                        models: [activities, chart],
                        component: () => import('./pages/AntdPro/Dashboard/Workplace'),
                    },
                ]
            },
            // forms
            {
                name: 'form',
                path: '/antd-pro/form',
                icon: 'form',
                authority: ['admin', 'user'],
                models: [form],
                routes: [
                    {
                        name: 'basicform',
                        path: '/antd-pro/form/basic-form',
                        component: () => import('./pages/AntdPro/Forms/BasicForm'),
                    },
                    {
                        name: 'stepform',
                        path: '/antd-pro/form/step-form',
                        component: () => import('./pages/AntdPro/Forms/StepForm'),
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/antd-pro/form/step-form',
                                redirect: '/antd-pro/form/step-form/info',
                            },
                            {
                                path: '/antd-pro/form/step-form/info',
                                name: 'info',
                                component: () => import('./pages/AntdPro/Forms/StepForm/Step1'),
                            },
                            {
                                name: 'confirm',
                                path: '/antd-pro/form/step-form/confirm',
                                component: () => import('./pages/AntdPro/Forms/StepForm/Step2'),
                            },
                            {
                                name: 'result',
                                path: '/antd-pro/form/step-form/result',
                                component: () => import('./pages/AntdPro/Forms/StepForm/Step3'),
                            },
                        ],
                    },
                    {
                        name: 'advancedform',
                        path: '/antd-pro/form/advanced-form',
                        component: () => import('./pages/AntdPro/Forms/AdvancedForm'),
                    },
                ]
            },
            // list
            {
                name: 'list',
                path: '/antd-pro/list',
                icon: 'table',
                models: [rule, list],
                routes: [
                    {
                        name: 'searchtable',
                        path: '/antd-pro/list/table-list',
                        component: () => import('./pages/AntdPro/List/TableList'),
                    },
                    {
                        name: 'basiclist',
                        path: '/antd-pro/list/basic-list',
                        component: () => import('./pages/AntdPro/List/BasicList'),
                    },
                    {
                        name: 'cardlist',
                        path: '/antd-pro/list/card-list',
                        component: () => import('./pages/AntdPro/List/CardList'),
                    },
                    {
                        name: 'searchlist',
                        path: '/antd-pro/list/search',
                        component: () => import('./pages/AntdPro/List/List'),
                        routes: [
                            {
                                path: '/antd-pro/list/search',
                                redirect: '/antd-pro/list/search/articles',
                            },
                            {
                                name: 'articles',
                                path: '/antd-pro/list/search/articles',
                                component: () => import('./pages/AntdPro/List/Articles'),
                            },
                            {
                                name: 'projects',
                                path: '/antd-pro/list/search/projects',
                                component: () => import('./pages/AntdPro/List/Projects'),
                            },
                            {
                                name: 'applications',
                                path: '/antd-pro/list/search/applications',
                                component: () => import('./pages/AntdPro/List/Applications'),
                            },
                        ],
                    },
                ],
            },
            // Profile
            {
                name: 'profile',
                path: '/antd-pro/profile',
                icon: 'profile',
                models: [profile],
                routes: [
                    // profile
                    {
                        name: 'basic',
                        path: '/antd-pro/profile/basic',
                        component: () => import('./pages/AntdPro/Profile/BasicProfile'),
                    },
                    {
                        name: 'basic',
                        path: '/antd-pro/profile/basic/:id',
                        hideInMenu: true,
                        component: () => import('./pages/AntdPro/Profile/BasicProfile'),
                    },
                    {
                        name: 'advanced',
                        path: '/antd-pro/profile/advanced',
                        authority: ['admin'],
                        component: () => import('./pages/AntdPro/Profile/AdvancedProfile'),
                    },
                ],
            },
            // Result
            {
                name: 'result',
                icon: 'check-circle-o',
                path: '/antd-pro/result',
                routes: [
                    // result
                    {
                        name: 'success',
                        path: '/antd-pro/result/success',
                        component: () => import('./pages/AntdPro/Result/Success'),
                    },
                    {
                        name: 'fail',
                        path: '/antd-pro/result/fail',
                        component: () => import('./pages/AntdPro/Result/Error')
                    },
                ],
            },
            // Exception
            {
                name: 'exception',
                path: '/exception',
                icon: 'warning',
                models: () => import('./pages/Exception/models/error'),
                routes: [
                    // exception
                    {
                        name: 'not-permission',
                        path: '/exception/403',
                        component: () => import('./pages/Exception/403'),
                    },
                    {
                        name: 'not-find',
                        path: '/exception/404',
                        component: () => import('./pages/Exception/404'),
                    },
                    {
                        name: 'server-error',
                        path: '/exception/500',
                        component: () => import('./pages/Exception/500'),
                    },
                    {
                        name: 'trigger',
                        path: '/exception/trigger',
                        hideInMenu: true,
                        component: () => import('./pages/Exception/TriggerException'),
                    },
                ],
            },
            // Account
            {
                name: 'account',
                icon: 'user',
                path: '/antd-pro/account',
                models: [list],
                routes: [
                    {
                        name: 'center',
                        path: '/antd-pro/account/center',
                        component: () => import('./pages/AntdPro/Account/Center/Center'),
                        routes: [
                            {
                                path: '/antd-pro/account/center',
                                redirect: '/antd-pro/account/center/articles',
                            },
                            {
                                path: '/antd-pro/account/center/articles',
                                component: () => import('./pages/AntdPro/Account/Center/Articles'),
                            },
                            {
                                path: '/antd-pro/account/center/applications',
                                component: () => import('./pages/AntdPro/Account/Center/Applications'),
                            },
                            {
                                path: '/antd-pro/account/center/projects',
                                component: () => import('./pages/AntdPro/Account/Center/Projects'),
                            },
                        ],
                    },
                    {
                        name: 'settings',
                        path: '/antd-pro/account/settings',
                        models: () => import('./pages/AntdPro/Account/Settings/models/geographic'),
                        component: () => import('./pages/AntdPro/Account/Settings/Info'),
                        routes: [
                            {
                                path: '/antd-pro/account/settings',
                                redirect: '/antd-pro/account/settings/base',
                            },
                            {
                                path: '/antd-pro/account/settings/base',
                                component: () => import('./pages/AntdPro/Account/Settings/BaseView'),
                            },
                            {
                                path: '/antd-pro/account/settings/security',
                                component: () => import('./pages/AntdPro/Account/Settings/SecurityView'),
                            },
                            {
                                path: '/antd-pro/account/settings/binding',
                                component: () => import('./pages/AntdPro/Account/Settings/BindingView'),
                            },
                            {
                                path: '/antd-pro/account/settings/notification',
                                component: () => import('./pages/AntdPro/Account/Settings/NotificationView'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
