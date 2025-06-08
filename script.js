document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content');
    
    // Проверка поддержки fetch
    if (!window.fetch) {
        showError("Ваш браузер устарел. Пожалуйста, обновите его.");
        return;
    }

    // Показ ошибки
    function showError(message) {
        contentArea.innerHTML = `
            <section class="error">
                <h2>Ошибка загрузки</h2>
                <p>${message}</p>
                <p>Попробуйте:</p>
                <ul>
                    <li>Проверить подключение к интернету</li>
                    <li>Запустить через локальный сервер</li>
                    <li>Обновить страницу (F5)</li>
                </ul>
            </section>
        `;
    }

    // Загрузка контента
    async function loadContent(sectionId) {
        try {
            const response = await fetch(`content/${sectionId}.html`);
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            contentArea.innerHTML = await response.text();
            
            // Для кнопки "Загрузить больше"
            if (sectionId === 'home') {
                const loadBtn = document.getElementById('load-more');
                if (loadBtn) {
                    loadBtn.addEventListener('click', loadMoreVideos);
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            showError(`Не удалось загрузить содержимое. ${error.message}`);
        }
    }

    // Навигация
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            loadContent(this.getAttribute('href').substring(1));
        });
    });

    // Инициализация
    loadContent('home');
});