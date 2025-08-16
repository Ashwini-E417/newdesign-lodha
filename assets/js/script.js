//sticky header JS
    function resizeHeader() {
        const header = document.querySelector('header');
    if (window.innerWidth > 768) {
let lastScroll = 0;

const bannerHeight = document.querySelector('.bannerContainer').offsetHeight;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= bannerHeight) {
        // We are still in or near the banner area
        if (currentScroll <= 50) {
            // At very top → always show
            header.classList.remove('hide');
        } 
        else if (currentScroll > lastScroll) {
            // Scrolling down in banner area → hide
            header.classList.add('hide');
        } 
        else {
            // Scrolling up in banner area → show
            header.classList.remove('hide');
        }
    } 
    else {
        // Beyond banner → always hide first navbar
        header.classList.add('hide');
    }

    lastScroll = currentScroll;
});
    }
    else {
        header.classList.remove("hide");
    }
}
window.addEventListener("resize",(e)=>{
    e.preventDefault();
    resizeHeader();
})
window.addEventListener("load",(e)=>{
    e.preventDefault();
    resizeHeader();
})


//Overview and menubar JS
    document.querySelectorAll(".readMoreLink").forEach((element,index)=>{
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelectorAll(".clamptext")[index].classList.toggle("clamptext-block");
            element.innerHTML = (element.innerHTML === "Read Less") ? "Read More" : "Read Less" ;
        });
    });

            document.getElementById("burgerMenu").addEventListener("click", function () {
                document.body.classList.toggle("mobMenuOpen");
                document.querySelector(".sidebar").classList.toggle("sidebaractive");
            });

            window.addEventListener("load",(e)=>{
                e.preventDefault();
                document.querySelector(".sidebar").style.top = document.querySelector("header").clientHeight+"px"
            })


            //Amenities JS
        class AmenitiesCarousel {
            constructor() {
                // Get the original slides
                this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
                this.amenitiesTotalSlides = this.originalSlides.length;
                
                // Store data for lightbox
                this.amenitiesImages = [];
                this.amenitiesTexts = [];
                
                // Extract data from original slides
                this.originalSlides.forEach(slide => {
                    const img = slide.querySelector('.amenities-image');
                    const text = slide.querySelector('.amenities-text-overlay');
                    this.amenitiesImages.push(img.src);
                    this.amenitiesTexts.push(text.textContent);
                    
                    // Add error handling for images
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                    };
                });
                
                // Setup carousel variables
                this.amenitiesCurrentIndex = 0;
                this.amenitiesTrack = document.getElementById('amenitiesTrack');
                // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
                this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
                this.amenitiesNextBtn = document.getElementById('amenitiesNext');
                this.amenitiesAutoPlayInterval = null;
                this.amenitiesIsTransitioning = false;
                
                // Calculate starting position for seamless infinite scroll
                this.amenitiesPosition = this.amenitiesTotalSlides;
                
                // Lightbox elements
                this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
                this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
                this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
                this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
                this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
                this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
                this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
                this.amenitiesLightboxCurrentIndex = 0;
                
                // Initialize the carousel
                this.amenitiesInit();
            }
            
            amenitiesInit() {
                // Clone slides for infinite effect
                this.amenitiesCloneSlides();
                
                // Create dots
                // this.amenitiesCreateDots();
                
                // Bind events
                this.amenitiesBindEvents();
                this.amenitiesBindLightboxEvents();
                
                // Position the carousel
                this.amenitiesUpdateCarousel();
                
                // Start autoplay
                this.amenitiesStartAutoPlay();
            }
            
            amenitiesCloneSlides() {
                // Create clones for infinite scrolling effect
                const fragmentStart = document.createDocumentFragment();
                const fragmentEnd = document.createDocumentFragment();
                
                // Clone first 3 slides to the end
                for (let i = 0; i < 3; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentEnd.appendChild(clone);
                }
                
                // Clone last 3 slides to the beginning
                for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentStart.appendChild(clone);
                }
                
                // Append clones to track
                this.amenitiesTrack.prepend(fragmentStart);
                this.amenitiesTrack.appendChild(fragmentEnd);
                
                // Setup image click events for all slides
                this.amenitiesSetupImageClickEvents();
            }
            
            amenitiesSetupImageClickEvents() {
                const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                slides.forEach((slide, index) => {
                    const img = slide.querySelector('.amenities-image');
                    img.addEventListener('click', () => {
                        // Calculate original image index
                        const totalSlides = slides.length;
                        const originalIndex = (index - 3 + totalSlides) % this.amenitiesTotalSlides;
                        this.openAmenitiesLightbox(originalIndex);
                    });
                });
            }
            
            // amenitiesCreateDots() {
            //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
            //         const amenitiesDot = document.createElement('button');
            //         amenitiesDot.className = 'amenities-dot';
            //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
            //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
            //     }
            // }
            
            amenitiesBindEvents() {
                this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
                this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());
                
                // Touch events for mobile
                let amenitiesStartX = 0;
                let amenitiesEndX = 0;
                
                this.amenitiesTrack.addEventListener('touchstart', (e) => {
                    amenitiesStartX = e.touches[0].clientX;
                },{passive:true});
                
                this.amenitiesTrack.addEventListener('touchend', (e) => {
                    amenitiesEndX = e.changedTouches[0].clientX;
                    const amenitiesDiff = amenitiesStartX - amenitiesEndX;
                    
                    if (Math.abs(amenitiesDiff) > 50) {
                        if (amenitiesDiff > 0) {
                            this.amenitiesNextSlide();
                        } else {
                            this.amenitiesPrevSlide();
                        }
                    }
                },{passive:true});
                
                // Pause autoplay on hover
                this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
                this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.amenitiesPrevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.amenitiesNextSlide();
                    } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                        this.closeAmenitiesLightbox();
                    }
                });
            }
            
            amenitiesBindLightboxEvents() {
                // Close lightbox events
                this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
                this.amenitiesLightbox.addEventListener('click', (e) => {
                    if (e.target === this.amenitiesLightbox) {
                        this.closeAmenitiesLightbox();
                    }
                });
                
                // Lightbox navigation
                this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
                this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
            }
            
            openAmenitiesLightbox(index) {
                console.log(index);
                this.amenitiesLightboxCurrentIndex = index;
                this.amenitiesLightboxImage.src = this.amenitiesImages[index];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
                this.updateAmenitiesLightboxCounter();
                this.amenitiesLightbox.classList.add('active');
                this.amenitiesStopAutoPlay();
                document.body.style.overflow = 'hidden';
            }
            
            closeAmenitiesLightbox() {
                this.amenitiesLightbox.classList.remove('active');
                this.amenitiesStartAutoPlay();
                document.body.style.overflow = 'auto';
            }
            
            amenitiesLightboxPrevImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            amenitiesLightboxNextImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            updateAmenitiesLightboxCounter() {
                this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
            }
            
            amenitiesUpdateCarousel() {
                const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');
                
                // Calculate which slide is in the center
                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesCenterIndex = amenitiesIsMobile ? 
                    this.amenitiesPosition + 1 : 
                    this.amenitiesPosition + 1;
                
                // Update center slide highlighting
                // amenitiesSlides.forEach((slide, index) => {
                //     slide.classList.remove('amenities-center');
                //     if (index === amenitiesCenterIndex) {
                //         slide.classList.add('amenities-center');
                //     }
                // });
                
                // Update active dot
                // amenitiesDots.forEach((dot, index) => {
                //     dot.classList.remove('amenities-active');
                //     if (index === this.amenitiesCurrentIndex) {
                //         dot.classList.add('amenities-active');
                //     }
                // });
                
                // Move carousel
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
                this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
                console.log("middle");
            }
            
            amenitiesNextSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition++;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                    if (this.amenitiesPosition >= totalSlides - 3) {
                        this.amenitiesTrack.style.transition = 'none';
                        this.amenitiesPosition = 3;
                        
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        console.log("rresetting");
                        // amenitiesSlides[index].classList.add("amenities-center");
                        console.log("Adding");
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            console.log(this.amenitiesTrack.style.transform);
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesPrevSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition--;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    if (this.amenitiesPosition <= 0) {
                        this.amenitiesTrack.style.transition = 'none';
                        const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                        this.amenitiesPosition = totalSlides - 6;
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesGoToSlide(index) {
                if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;
                
                this.amenitiesIsTransitioning = true;
                
                // Calculate the difference
                const diff = index - this.amenitiesCurrentIndex;
                this.amenitiesPosition += diff;
                this.amenitiesCurrentIndex = index;
                
                this.amenitiesUpdateCarousel();
                
                setTimeout(() => {
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesStartAutoPlay() {
                this.amenitiesStopAutoPlay();
                this.amenitiesAutoPlayInterval = setInterval(() => {
                    this.amenitiesNextSlide();
                }, 5000);
            }
            
            amenitiesStopAutoPlay() {
                if (this.amenitiesAutoPlayInterval) {
                    clearInterval(this.amenitiesAutoPlayInterval);
                    this.amenitiesAutoPlayInterval = null;
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new AmenitiesCarousel();
        });
