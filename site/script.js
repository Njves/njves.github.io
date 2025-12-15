// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Form submission
document
    .querySelector(".contact-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
        this.reset();
    });

// Loyalty System
const loyaltyModal = document.getElementById("loyalty-modal");
const loyaltyProfileLink = document.getElementById("loyalty-profile-link");
const joinLoyaltyBtn = document.getElementById("join-loyalty-btn");
const closeBtn = document.querySelector(".close");

// User data (в реальном приложении это будет храниться на сервере)
let userData = {
    name: "Александр Иванов",
    tier: "gold",
    points: 2450,
    totalSpent: 250000,
    tierNames: {
        bronze: "Бронза",
        silver: "Серебро",
        gold: "Золото",
        platinum: "Платина",
    },
    tierRequirements: {
        bronze: 0,
        silver: 50000,
        gold: 150000,
        platinum: 300000,
    },
    tierBenefits: {
        bronze: [
            "5% бонусами за каждый заказ",
            "Приоритетная поддержка",
            "Скидка на повторные заказы",
        ],
        silver: [
            "7% бонусами за каждый заказ",
            "Бесплатная консультация 1 раз в год",
            "Приоритетная запись",
            "Скидка 5% на все услуги",
        ],
        gold: [
            "10% бонусами за каждый заказ",
            "Бесплатная консультация 2 раза в год",
            "Персональный менеджер",
            "Скидка 10% на все услуги",
            "Специальные сезонные предложения",
        ],
        platinum: [
            "15% бонусами за каждый заказ",
            "Безлимитные консультации",
            "VIP обслуживание",
            "Скидка 15% на все услуги",
            "Эксклюзивные предложения",
            "Приоритет в графике работ",
        ],
    },
};

// Функция для обновления отображения профиля
function updateProfileDisplay() {
    document.getElementById("user-name").textContent = userData.name;
    document.getElementById("user-tier").textContent =
        userData.tierNames[userData.tier];
    document.getElementById("user-points").textContent =
        userData.points.toLocaleString("ru-RU");

    // Определяем следующий уровень
    let nextTier = null;
    let nextTierAmount = 0;
    const tierLevels = ["bronze", "silver", "gold", "platinum"];
    const currentTierIndex = tierLevels.indexOf(userData.tier);

    if (currentTierIndex < tierLevels.length - 1) {
        nextTier = tierLevels[currentTierIndex + 1];
        nextTierAmount =
            userData.tierRequirements[nextTier] - userData.totalSpent;

        // Прогресс к следующему уровню
        const currentRequirement = userData.tierRequirements[userData.tier];
        const nextRequirement = userData.tierRequirements[nextTier];
        const progress =
            ((userData.totalSpent - currentRequirement) /
                (nextRequirement - currentRequirement)) *
            100;

        document.getElementById("progress-fill").style.width =
            Math.min(progress, 100) + "%";
        document.getElementById("next-tier-text").textContent =
            `До статуса "${userData.tierNames[nextTier]}" осталось: ${nextTierAmount.toLocaleString("ru-RU")} ₽`;
    } else {
        // Максимальный уровень достигнут
        document.getElementById("progress-fill").style.width = "100%";
        document.getElementById("next-tier-text").textContent =
            "🎉 Вы достигли максимального статуса!";
    }

    // Обновляем список привилегий
    const benefitsList = document.getElementById("user-benefits");
    benefitsList.innerHTML = "";
    userData.tierBenefits[userData.tier].forEach((benefit) => {
        const li = document.createElement("li");
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
}

// Открытие модального окна профиля
loyaltyProfileLink.addEventListener("click", function (e) {
    e.preventDefault();
    updateProfileDisplay();
    loyaltyModal.style.display = "block";
    document.body.style.overflow = "hidden";
});

// Присоединение к программе
joinLoyaltyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // В реальном приложении здесь будет форма регистрации
    alert(
        'Добро пожаловать в программу лояльности ЛандшафтПро! 🌿\n\nВы получили статус "Бронза" и 100 приветственных бонусов!'
    );

    // Обновляем данные пользователя
    userData.tier = "bronze";
    userData.points = 100;
    userData.totalSpent = 0;

    updateProfileDisplay();
    loyaltyModal.style.display = "block";
    document.body.style.overflow = "hidden";
});

// Закрытие модального окна
closeBtn.addEventListener("click", function () {
    loyaltyModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Закрытие при клике вне модального окна
window.addEventListener("click", function (event) {
    if (event.target === loyaltyModal) {
        loyaltyModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Закрытие модального окна при нажатии ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && loyaltyModal.style.display === "block") {
        loyaltyModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Симуляция добавления баллов (для демонстрации)
function addPoints(amount) {
    const tierBonuses = {
        bronze: 0.05,
        silver: 0.07,
        gold: 0.1,
        platinum: 0.15,
    };

    const bonus = Math.floor(amount * tierBonuses[userData.tier]);
    userData.points += bonus;
    userData.totalSpent += amount;

    // Проверяем повышение статуса
    if (userData.totalSpent >= 300000 && userData.tier !== "platinum") {
        userData.tier = "platinum";
        alert('🎉 Поздравляем! Вы достигли статуса "Платина"!');
    } else if (userData.totalSpent >= 150000 && userData.tier === "silver") {
        userData.tier = "gold";
        alert('🎉 Поздравляем! Вы достигли статуса "Золото"!');
    } else if (userData.totalSpent >= 50000 && userData.tier === "bronze") {
        userData.tier = "silver";
        alert('🎉 Поздравляем! Вы достигли статуса "Серебро"!');
    }

    updateProfileDisplay();
}

// Функция для тестирования (можно вызвать из консоли браузера)
window.loyaltyTest = {
    addOrder: function (amount) {
        addPoints(amount);
        const tierBonuses = {
            bronze: 0.05,
            silver: 0.07,
            gold: 0.1,
            platinum: 0.15,
        };
        const bonus = Math.floor(amount * tierBonuses[userData.tier]);
        alert(
            `Заказ на ${amount.toLocaleString("ru-RU")} ₽ обработан!\nНачислено бонусов: ${bonus}`
        );
    },
    showProfile: function () {
        console.log("Текущий профиль пользователя:", userData);
    },
    resetProfile: function () {
        userData.tier = "bronze";
        userData.points = 0;
        userData.totalSpent = 0;
        updateProfileDisplay();
        alert("Профиль сброшен!");
    },
};

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    console.log("Сайт загружен! Программа лояльности активна.");
    console.log(
        "Для тестирования используйте команды в консоли:\n- loyaltyTest.addOrder(сумма) - добавить заказ\n- loyaltyTest.showProfile() - показать профиль\n- loyaltyTest.resetProfile() - сбросить профиль"
    );
});
