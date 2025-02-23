const menuData = [
    {
        title: "Ana Sayfa",
        link: "../..",
        subMenu: []
    },
    {
        title: ".Net CLI",
        subMenu: [
            { title: ".NET CLI Nedir ve Nasıl Kullanılır?", link: "dotnet-cli/dotnet-cli-nedir-ve-nasil-kullanilir/" }
        ]
    },
    {
        title: "Entity Framework",
        subMenu: [
            { title: "Entity Framework Nedir?", link: "entity-framework/entity-framework-nedir-orm-teknolojisine-genel-bakis/" },
            { title: "N+1 Problemi Nedir?", link: "../../entity-framework/n-arti-bir-problemi-nedir/" },
            { title: "Transaction Yönetimi", link: "entity-framework/entity-framework-de-transaction-yonetimi-ve-en-iyi-uygulamalar/" }
        ]
    },
    {
        title: "Logging",
        subMenu: [
            { title: "Serilog", link: "./" },
            { title: "NLog", link: "logging/nlog/" },
            { title: "Splunk", link: "../../logging/splunk/" },
            { title: "New Relic", link: "logging/new-relic/" }
        ]
    },

    {
        title: ".Net CLI",
        subMenu: [
            { title: ".NET CLI Nedir ve Nasıl Kullanılır?", link: "../../dotnet-cli/dotnet-cli-nedir-ve-nasil-kullanilir/" },
            { title: ".NET CLI ile Yeni Proje Oluşturma", link: "../../dotnet-cli/dotnet-cli-ile-yeni-proje-olusturma/" },
            { title: ".NET CLI ile Proje Şablonları Kullanımı", link: "../../dotnet-cli/dotnet-cli-ile-proje-sablonlari-kullanimi/" },
            { title: ".NET CLI ile Bağımlılık Yönetimi", link: "../../dotnet-cli/dotnet-cli-ile-bagimlilik-yonetimi/" },
            { title: ".NET CLI ile Proje Derleme ve Çalıştırma", link: "../../dotnet-cli/dotnet-cli-ile-proje-derleme-ve-calistirma/" },
            { title: ".NET CLI ile Unit Test Çalıştırma", link: "../../dotnet-cli/dotnet-cli-ile-unit-test-calistirm/" },
            { title: ".NET CLI Komutları: Temel Rehber", link: "../../dotnet-cli/dotnet-cli-komutlari-temel-rehber" },
            { title: ".NET CLI ile Global Araçlar (Global Tools) Kullanımı", link: "../../dotnet-cli/dotnet-cli-ile-global-araclar-global-tools-kullanimi/" },
            { title: ".NET CLI ile Projeyi Yayınlama (Publishing)", link: "../../dotnet-cli/net-ile-projeyi-yayinlama/" },
            { title: ".NET CLI İle RESTful API Oluşturma", link: "../../dotnet-cli/dotnet-cli-ile-restful-api-olusturma/" },
            { title: ".NET CLI Komutları ile Migration Yönetimi", link: "../../dotnet-cli/dotnet-cli-komutlari-ile-migration-yonetimi/" },
            { title: ".NET CLI Kullanarak Docker İmajı Hazırlama", link: "../../dotnet-cli/dotnet-cli-kullanarak-docker-imaji-hazirlama/" },
            { title: ".NET CLI ile Performans Analizi", link: "../../dotnet-cli/dotnet-cli-ile-performans-analizi/" },
            { title: ".NET CLI ve Git Entegrasyonu", link: "../../dotnet-cli/dotnet-cli-ve-git-entegrasyonu/" },
            { title: ".NET CLI Kullanarak Multi-Platform Projeler Geliştirme", link: "../../dotnet-cli/dotnet-cli-kullanarak-multi-platform-projeler-gelistirme/" },
            { title: ".NET CLI ile OpenAPI Desteği Eklemek", link: "../../dotnet-cli/adding-openapi-support/" },
            { title: ".NET CLI ile Blazor Projesi Oluşturma", link: "../../dotnet-cli/dotnet-cli-ile-blazor-projesi-olusturma/" },
            { title: ".NET CLI ile Minimal API Başlangıcı", link: "../../dotnet-cli/dotnet-cli-ile-minimal-api-baslangici/" },
            { title: ".NET CLI Kullanarak CI/CD Süreçleri Otomasyonu", link: "../../dotnet-cli/dotnet-kullanilarak-ci-cd-surecleri-otomasyonu/" }
        ]
    },

];


const currentPath = window.location.pathname;

function generateMenu(menuItems) {
    let menuHTML = '<nav class="md-nav"><ul class="md-nav__list">';

    menuItems.forEach(item => {
        let isActiveCategory = item.subMenu.some(sub => currentPath.includes(sub.link));
        let categoryClass = isActiveCategory ? 'md-nav__item md-nav__item--active md-nav__item--nested' : 'md-nav__item md-nav__item--nested';

        menuHTML += `<li class="${categoryClass}">`;

        if (item.subMenu.length > 0) {
            let inputId = `nav_${item.title.replace(/\s+/g, "_")}_${Math.random().toString(36).substring(2)}`;  // Benzersiz ID
            menuHTML += ` 
                <input class="md-nav__toggle md-toggle menu-toggle" type="checkbox" id="${inputId}">
                <label class="md-nav__link" for="${inputId}">
                    <span class="md-ellipsis">${item.title}</span>
                    <span class="md-nav__icon md-icon"></span>
                </label>
                <ul class="md-nav__list" style="display: none;"> <!-- Başta kapalı -->
            `;

            item.subMenu.forEach(subItem => {
                let isActive = currentPath.includes(subItem.link) ? 'md-nav__link md-nav__link--active' : 'md-nav__link';
                menuHTML += `
                    <li class="md-nav__item">
                        <a href="${subItem.link}" class="${isActive}">
                            <span class="md-ellipsis">${subItem.title}</span>
                        </a>
                    </li>
                `;
            });

            menuHTML += '</ul>';
        } else {
            let isActive = currentPath.includes(item.link) ? 'md-nav__link md-nav__link--active' : 'md-nav__link';
            menuHTML += `<a href="${item.link}" class="${isActive}"><span class="md-ellipsis">${item.title}</span></a>`;
        }

        menuHTML += '</li>';
    });

    menuHTML += '</ul></nav>';

    document.getElementById('dynamicMenu').innerHTML = menuHTML;

    const toggles = document.querySelectorAll('.menu-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const submenu = this.nextElementSibling.nextElementSibling;
            if (this.checked) {
                submenu.style.display = 'block';
            } else {
                submenu.style.display = 'none';
            }
        });
    });
}

// Menü oluştur
document.addEventListener("DOMContentLoaded", () => {
    generateMenu(menuData);
});