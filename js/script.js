// База данных значений
const dataBase = {
    1: { title: "1 — Лидер", desc: "Энергия созидания, независимость и старт новых начинаний." },
    2: { title: "2 — Партнер", desc: "Гармония, дипломатия, умение слышать и находить компромисс." },
    3: { title: "3 — Творец", desc: "Творчество, самовыражение, оптимизм и дар общения." },
    4: { title: "4 — Прагматик", desc: "Стабильность, упорный труд, надежность и системность." },
    5: { title: "5 — Искатель", desc: "Свобода, приключения, перемены и жажда новых впечатлений." },
    6: { title: "6 — Хранитель", desc: "Ответственность, семья, забота и стремление к красоте." },
    7: { title: "7 — Философ", desc: "Интуиция, поиск истины, анализ и духовное развитие." },
    8: { title: "8 — Управитель", desc: "Материальный успех, власть, карма и большие достижения." },
    9: { title: "9 — Гуманист", desc: "Служение миру, мудрость, завершение циклов и сострадание." }
};

// Глобальная переменная для графика и массив со счетчиками кликов
let activityChart;
let clickCounts = [12, 19, 3, 5, 2, 3, 7, 10, 8]; // Стартовые значения

function showInfo(num) {
    num = parseInt(num);
    const resTitle = document.getElementById('resTitle');
    const resDesc = document.getElementById('resDesc');

    if (dataBase[num]) {
        resTitle.innerText = dataBase[num].title;
        resDesc.innerText = dataBase[num].desc;

        // ОБНОВЛЕНИЕ ГРАФИКА
        updateChartData(num);
    }
}

function updateChartData(num) {
    // Индекс в массиве (число 1 — это индекс 0)
    const index = num - 1;
    if (index >= 0 && index < clickCounts.length) {
        // Увеличиваем значение в массиве
        clickCounts[index] += 1;

        // Обновляем данные в самом объекте графика
        activityChart.data.datasets[0].data = clickCounts;
        // Перерисовываем график с анимацией
        activityChart.update();
    }
}

// Поиск по вводу
document.getElementById('findNumber').onclick = function () {
    const val = document.getElementById('numberInput').value;
    if (val) showInfo(val);
};

// Инициализация при загрузке
window.onload = function () {
    const ctx = document.getElementById('userActivityChart').getContext('2d');

    activityChart = new Chart(ctx, {
        type: 'bar', // Столбцы нагляднее показывают рост при клике
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Интерес к числам (клики)',
                data: clickCounts,
                backgroundColor: 'rgba(212, 175, 55, 0.5)',
                borderColor: '#d4af37',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#fff' }
                },
                x: {
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
};

const seasonSlides = document.querySelectorAll('.season-slide');
const seasonDots = document.querySelectorAll('.season-dot');
const seasonPrev = document.getElementById('seasonPrev');
const seasonNext = document.getElementById('seasonNext');

let currentSeason = 0;

function updateSeasonSlider(index) {
    currentSeason = (index + seasonSlides.length) % seasonSlides.length;

    seasonSlides.forEach((slide, slideIndex) => {
        slide.classList.remove(
            'active',
            'prev',
            'next',
            'hidden-slide',
            'is-flipped'
        );

        if (slideIndex === currentSeason) {
            slide.classList.add('active');
        } else if (
            slideIndex ===
            (currentSeason - 1 + seasonSlides.length) % seasonSlides.length
        ) {
            slide.classList.add('prev');
        } else if (
            slideIndex ===
            (currentSeason + 1) % seasonSlides.length
        ) {
            slide.classList.add('next');
        } else {
            slide.classList.add('hidden-slide');
        }
    });

    seasonDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSeason);
    });
}

seasonSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        if (index !== currentSeason) {
            updateSeasonSlider(index);
            return;
        }

        slide.classList.toggle('is-flipped');
    });
});

seasonPrev.addEventListener('click', () => {
    updateSeasonSlider(currentSeason - 1);
});

seasonNext.addEventListener('click', () => {
    updateSeasonSlider(currentSeason + 1);
});

seasonDots.forEach((dot) => {
    dot.addEventListener('click', () => {
        updateSeasonSlider(Number(dot.dataset.slide));
    });
});

updateSeasonSlider(0);

const chineseZodiacData = [
    {
        animal: "🐀",
        name: "Крыса",
        years: "2020 / 2032",
        element: "Металл",
        description:
            "Крыса отличается умом, наблюдательностью и практичностью. Она быстро ориентируется в новых обстоятельствах, умеет находить выгоду и легко заводит полезные знакомства. Представители этого знака энергичны, любознательны и не боятся перемен. Иногда могут быть излишне осторожными, расчётливыми и беспокойными."
    },
    {
        animal: "🐂",
        name: "Бык",
        years: "2021 / 2033",
        element: "Металл",
        description:
            "Бык спокойный, терпеливый и надёжный. Он привык добиваться целей упорным трудом и не отступает перед трудностями. Представители знака ценят стабильность, порядок и честность. Их сильные стороны — ответственность и выдержка, а слабые — упрямство, консервативность и нежелание быстро менять планы."
    },
    {
        animal: "🐅",
        name: "Тигр",
        years: "2022 / 2034",
        element: "Вода",
        description:
            "Тигр смелый, независимый и решительный. Он обладает сильной волей, яркой харизмой и стремлением защищать свои убеждения. Представители знака любят риск, приключения и лидерство. Иногда они бывают импульсивными, вспыльчивыми и слишком прямолинейными, но быстро восстанавливаются после неудач."
    },
    {
        animal: "🐇",
        name: "Кролик",
        years: "2023 / 2035",
        element: "Вода",
        description:
            "Кролик мягкий, тактичный и дипломатичный. Он хорошо чувствует настроение окружающих, умеет избегать конфликтов и создавать вокруг себя спокойную атмосферу. Представители знака ценят красоту, уют и безопасность. Их уязвимость проявляется в повышенной чувствительности, осторожности и страхе перед резкими переменами."
    },
    {
        animal: "🐉",
        name: "Дракон",
        years: "2024 / 2036",
        element: "Дерево",
        description:
            "Дракон яркий, амбициозный и уверенный в себе. Он стремится к масштабным целям, любит вдохновлять людей и часто становится центром внимания. Представители знака обладают сильной энергетикой, творческим мышлением и лидерскими качествами. Иногда им мешают гордость, нетерпение и желание всё контролировать."
    },
    {
        animal: "🐍",
        name: "Змея",
        years: "2025 / 2037",
        element: "Дерево",
        description:
            "Змея мудрая, проницательная и интуитивная. Она внимательно наблюдает за людьми, умеет анализировать ситуацию и редко действует необдуманно. Представители знака обладают хорошей памятью, тонким вкусом и внутренней собранностью. Иногда они могут казаться замкнутыми, подозрительными или слишком скрытными."
    },
    {
        animal: "🐎",
        name: "Лошадь",
        years: "2026 / 2038",
        element: "Огонь",
        description:
            "Лошадь активная, свободолюбивая и общительная. Она любит движение, путешествия, новые впечатления и не переносит ограничений. Представители знака быстро загораются идеями, обладают природным обаянием и умеют вдохновлять других. Их недостатками могут быть нетерпеливость, непостоянство и стремление действовать без долгих размышлений."
    },
    {
        animal: "🐐",
        name: "Коза",
        years: "2027 / 2039",
        element: "Огонь",
        description:
            "Коза добрая, творческая и эмоциональная. Она обладает развитым воображением, ценит красоту и нуждается в тёплой атмосфере. Представители знака заботливы, миролюбивы и хорошо проявляют себя в творческих занятиях. Иногда им не хватает решительности, а повышенная чувствительность делает их зависимыми от чужого мнения."
    },
    {
        animal: "🐒",
        name: "Обезьяна",
        years: "2028 / 2040",
        element: "Земля",
        description:
            "Обезьяна находчивая, весёлая и изобретательная. Она быстро учится, любит эксперименты и умеет находить выход даже из сложных ситуаций. Представители знака обладают отличным чувством юмора и легко общаются с людьми. Иногда они бывают хитрыми, нетерпеливыми, непостоянными и склонными относиться к делам слишком легкомысленно."
    },
    {
        animal: "🐓",
        name: "Петух",
        years: "2029 / 2041",
        element: "Земля",
        description:
            "Петух организованный, прямолинейный и уверенный в себе. Он любит порядок, умеет планировать и обращает внимание на детали. Представители знака часто стремятся выглядеть достойно и не боятся открыто выражать своё мнение. Их слабые стороны — резкость, самолюбие, излишняя критичность и стремление всегда быть правыми."
    },
    {
        animal: "🐕",
        name: "Собака",
        years: "2030 / 2042",
        element: "Металл",
        description:
            "Собака честная, верная и ответственная. Она высоко ценит доверие, справедливость и всегда готова защищать близких. Представители знака надёжны в дружбе и умеют поддержать в трудный момент. Иногда они бывают тревожными, недоверчивыми и слишком серьёзно воспринимают чужие слова и поступки."
    },
    {
        animal: "🐖",
        name: "Свинья",
        years: "2031 / 2043",
        element: "Металл",
        description:
            "Свинья искренняя, добрая и щедрая. Она любит комфорт, дружеское общение и умеет радоваться простым вещам. Представители знака открыты, терпеливы и готовы помогать окружающим. Иногда их добротой могут пользоваться другие люди, а доверчивость и любовь к удовольствиям мешают принимать практичные решения."
    }
];

$(function () {
    const $table = $('.zodiac-table');
    if (!$table.length) return;

    $table.find('thead th').on('click', function () {
        const $th = $(this);
        const index = $th.index();
        const $tbody = $table.find('tbody');
        const rows = $tbody.find('tr').get();
        const isAscending = !$th.hasClass('asc');

        $table.find('thead th').removeClass('asc desc');
        $th.addClass(isAscending ? 'asc' : 'desc');

        rows.sort(function (a, b) {
            const valA = $(a).children('td').eq(index).text().trim();
            const valB = $(b).children('td').eq(index).text().trim();
            
            return isAscending 
                ? valA.localeCompare(valB, 'ru', { numeric: true }) 
                : valB.localeCompare(valA, 'ru', { numeric: true });
        });

        $.each(rows, function (i, row) {
            $tbody.append(row);
        });
    });

    $('#exportExcelBtn').on('click', function () {
        if (typeof XLSX === 'undefined') return console.error('SheetJS library is not loaded');
        const wb = XLSX.utils.table_to_book($table.get(0), { sheet: "Знаки Зодиака" });
        XLSX.writeFile(wb, "Знаки_Зодиака_и_Даты.xlsx");
    });

    $('#exportPdfBtn').on('click', function () {
        if (typeof html2pdf === 'undefined') return console.error('html2pdf library is not loaded');
        const opt = {
            margin:       15,
            filename:     'Знаки_Зодиака_и_Даты.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from($table.get(0)).save();
    });
});

$(function () {
    // ... здесь находится ваш предыдущий код сортировки, Excel и PDF ...

    // ==========================================
    // ЛОГИКА ОНЛАЙН-ЧАТА ПОДДЕРЖКИ (FORMSPREE)
    // ==========================================

    // Функция открыть/закрыть окно чата
    window.toggleChat = function() {
        const $chatWindow = $('#chatWindow');
        if ($chatWindow.css('display') === 'none') {
            $chatWindow.css('display', 'flex');
            // Прокрутка вниз при открытии
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            $chatWindow.css('display', 'none');
        }
    };

    function sendMessage() {
        const username = $('#chatUser').val().trim() || 'Гость';
        const userEmail = $('#chatEmail').val().trim();
        const text = $('#chatInput').val().trim();
        const $messagesContainer = $('#chatMessages');

        // Валидация заполнения полей
        if (text === '') return;
        if (userEmail === '') {
            $messagesContainer.append('<div class="message system" style="color: #ff4c4c;">Пожалуйста, укажите ваш Email для связи!</div>');
            return;
        }

        // Блокируем интерфейс ввода на время отправки (защита от спама кликами)
        $('#chatInput, #chatSendBtn').prop('disabled', true);

        // Сразу выводим сообщение пользователя на экран (имитация мессенджера)
        const userMessageHtml = `<div class="message user"><strong>${username}:</strong> ${text}</div>`;
        $messagesContainer.append(userMessageHtml);
        $('#chatInput').val(''); // Очищаем строку ввода
        $messagesContainer.animate({ scrollTop: $messagesContainer[0].scrollHeight }, 200);

        // Отправляем AJAX запрос на Formspree
        $.ajax({
            url: "https://formspree.io", // ВСТАВЬТЕ СЮДА ВАШ ПОЛУЧЕННЫЙ ID ВМЕСТО ХХХХХХХХ
            method: "POST",
            dataType: "json",
            data: {
                Name: username,
                Email: userEmail,
                Message: text
            },
            success: function() {
                // Успешный ответ сервера
                $messagesContainer.append('<div class="message system">Сообщение доставлено. Мы свяжемся с вами в ближайшее время!</div>');
            },
            error: function() {
                // Ошибка отправки (например, проблемы с сетью)
                $messagesContainer.append('<div class="message system" style="color: #ff4c4c;">Ошибка отправки. Пожалуйста, попробуйте позже.</div>');
            },
            complete: function() {
                // Разблокируем поля ввода
                $('#chatInput, #chatSendBtn').prop('disabled', false);
                $messagesContainer.animate({ scrollTop: $messagesContainer[0].scrollHeight }, 200);
            }
        });
    }

    // Обработка клика на стрелочку отправки
    $('#chatSendBtn').on('click', sendMessage);

    // Обработка отправки при нажатии на клавишу Enter
    $('#chatInput').on('keypress', function(e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
});



const chineseZodiacGrid = document.getElementById("chineseZodiacGrid");

if (chineseZodiacGrid) {
    chineseZodiacGrid.innerHTML = chineseZodiacData.map((zodiac, index) => `
        <article class="chinese-zodiac-card" tabindex="0">
            <div class="chinese-zodiac-card-inner">
                <div class="chinese-zodiac-front">
                    <div class="zodiac-animal">${zodiac.animal}</div>
                    <span class="zodiac-year">${String(index + 1).padStart(2, "0")} / ${zodiac.years}</span>
                    <h3>${zodiac.name}</h3>
                    <p>Наведите курсор, чтобы узнать характер знака</p>
                </div>

                <div class="chinese-zodiac-back">
                    <span class="zodiac-year">${zodiac.years}</span>
                    <h3>${zodiac.name}</h3>
                    <p>${zodiac.description}</p>
                    <span class="zodiac-element">Стихия: ${zodiac.element}</span>
                </div>
            </div>
        </article>
    `).join("");

    const zodiacCards = document.querySelectorAll(".chinese-zodiac-card");

    zodiacCards.forEach((card) => {
        card.addEventListener("click", () => {
            if (window.matchMedia("(hover: none)").matches) {
                card.classList.toggle("is-active");
            }
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.classList.toggle("is-active");
            }
        });
    });
}
