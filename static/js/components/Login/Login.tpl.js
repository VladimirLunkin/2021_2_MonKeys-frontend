(function() {
    const template = Handlebars.template;
    const templates = (Handlebars.templates = Handlebars.templates || {});
    templates['login'] = template({
        compiler: [8, '>= 4.3.0'],
        main: function(container, depth0, helpers, partials, data) {
            return '<body id="root">\n    <div class="card-container">\n        <div class="center-container">\n            <span class="login-header">Войти</span>\n        </div>\n        <div class="center-container">\n            <form class="login-form">\n                <div class="drip-logo-bg">\n                    <div class="input-with-icon"><input type="email" name="email" placeholder="Почта"\n                            class="form-field-valid" /><img src="icons/email.svg" class="input-icon" /></div>\n                    <div class="login-error">Введите пароль в формате example@drip.com</div>\n                    <div class="input-with-icon"><input type="password" name="password" placeholder="Пароль"\n                            class="form-field-valid" /><img src="icons/password.svg" class="input-icon" /></div>\n                    <div class="login-error">\n                        Пароль должен состоять из больших, маленьких латинских символов, цифр\n                        и спец символа</div>\n                </div>\n                <div class="login-error">Вы еще не\n                    зарегистрированы</div><button type="submit" class="login-button">\n                    <div class="center-container"><span class="login-button-text">Войти</span><img /></div>\n                </button>\n            </form>\n        </div>\n        <div class="center-container"><a class="reg-link" href="/signup" data-section="signup">Зарегистрироваться</a>\n        </div>\n    </div>\n</body>';
        },
        useData: true,
    });
})();