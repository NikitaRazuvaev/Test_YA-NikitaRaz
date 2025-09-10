        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.slider-track');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slider-button.prev');
            const nextBtn = document.querySelector('.slider-button.next');
            const currentPosition = document.getElementById('current-position');
            const totalSlides = document.getElementById('total-slides');
            
            let currentSlide = 0;
            let slidesToShow = 3;
            
            // Функция для определения количества отображаемых слайдов
            function getSlidesToShow() {
                if (window.innerWidth <= 480) return 1;
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            }
            
            // Пересчет общего количества страниц
            function calculateTotalPages() {
                slidesToShow = getSlidesToShow();
                return Math.ceil(slides.length / slidesToShow);
            }
            
            let totalPages = calculateTotalPages();
            
            // Устанавливаем общее количество страниц
            totalSlides.textContent = totalPages;
            
            // Функция для обновления слайдера
            function updateSlider() {
                const translateValue = -currentSlide * (100 / slidesToShow);
                track.style.transform = `translateX(${translateValue}%)`;
                
                // Обновляем текущую позицию
                currentPosition.textContent = currentSlide + 1;
                
                // Обновляем состояние кнопок
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === totalPages - 1;
                
                if (prevBtn.disabled) {
                    prevBtn.setAttribute('disabled', 'true');
                } else {
                    prevBtn.removeAttribute('disabled');
                }
                
                if (nextBtn.disabled) {
                    nextBtn.setAttribute('disabled', 'true');
                } else {
                    nextBtn.removeAttribute('disabled');
                }
            }
            
            // Переход к следующему набору слайдов
            nextBtn.addEventListener('click', function() {
                if (currentSlide < totalPages - 1) {
                    currentSlide++;
                    updateSlider();
                }
            });
            
            // Переход к предыдущему набору слайдов
            prevBtn.addEventListener('click', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });
            
            // Обработчики для кнопок "Подробнее"
            const detailButtons = document.querySelectorAll('.btn-sub');
            detailButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const playerName = this.parentElement.querySelector('.name-slide').textContent;
                    alert(`Подробная информация о ${playerName} будет здесь!`);
                });
            });
            
            // Обработка изменения размера окна
            window.addEventListener('resize', function() {
                // Пересчитываем количество слайдов для отображения
                const newTotalPages = calculateTotalPages();
                
                // Если количество страниц изменилось
                if (newTotalPages !== totalPages) {
                    totalPages = newTotalPages;
                    totalSlides.textContent = totalPages;
                    
                    // Корректируем текущий слайд, если он выходит за пределы
                    if (currentSlide >= totalPages) {
                        currentSlide = totalPages - 1;
                    }
                    
                    updateSlider();
                }
                
                // Всегда обновляем слайдер при изменении размера
                updateSlider();
            });
            
            // Инициализация слайдера
            updateSlider();
        });