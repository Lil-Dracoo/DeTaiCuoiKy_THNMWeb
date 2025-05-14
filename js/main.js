document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------- Slider --------------------------------------------------
    const slider = {
      container: document.querySelector(".slider-container"),
      slides: document.querySelectorAll(".slide"),
      buttons: {
        prev: document.querySelector(".prev"),
        next: document.querySelector(".next"),
      },
      dotsContainer: document.querySelector(".slider-dots"),
      currentSlide: 0,
  
      init() {
        this.createDots();
        this.updateDots();
        this.addEventListeners();
        this.startAutoSlide();
      },
  
      createDots() {
        for (let i = 0; i < this.slides.length; i++) {
          const dot = document.createElement("div");
          dot.classList.add("dot");
          dot.addEventListener("click", () => this.goToSlide(i));
          this.dotsContainer.appendChild(dot);
        }
      },
  
      updateDots() {
        const dots = this.dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === this.currentSlide);
        });
      },
  
      goToSlide(index) {
        this.currentSlide = index;
        this.container.style.transform = `translateX(-${index * 100}%)`;
        this.updateDots();
      },
  
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(this.currentSlide);
      },
  
      prevSlide() {
        this.currentSlide =
          (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentSlide);
      },
  
      addEventListeners() {
        this.buttons.prev.addEventListener("click", () => {
          this.prevSlide();
          this.resetAutoSlide();
        });
  
        this.buttons.next.addEventListener("click", () => {
          this.nextSlide();
          this.resetAutoSlide();
        });
  
        // Add keyboard navigation
        document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            this.prevSlide();
            this.resetAutoSlide();
          } else if (e.key === "ArrowRight") {
            this.nextSlide();
            this.resetAutoSlide();
          }
        });
  
        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
  
        this.container.addEventListener("touchstart", (e) => {
          touchStartX = e.touches[0].clientX;
        });
  
        this.container.addEventListener("touchend", (e) => {
          touchEndX = e.changedTouches[0].clientX;
          if (touchStartX - touchEndX > 50) {
            this.nextSlide();
            this.resetAutoSlide();
          } else if (touchEndX - touchStartX > 50) {
            this.prevSlide();
            this.resetAutoSlide();
          }
        });
      },
  
      startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
          this.nextSlide();
        }, 5000); // Change slide every 5 seconds
      },
  
      resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
      },
    };
  
    slider.init();
});

// -------------------------------------------------- Dropdown --------------------------------------------------
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

// -------------------------------------------------- Popup --------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const promoDetails = {
    "THỨ 4 COMBO DAY": {
      title: "THỨ 4 COMBO DAY",
      description: "- Mỗi thứ 4 sẽ được giảm giá bắp nước cho tất cả khách hàng. \n\
                    - Cụ thể: Combo bắp nước chỉ từ 49k. \n\
                    - Điều kiện chương trình: \n\
                    + Mỗi khách hàng mua tối đa 01 Combo mỗi lần. \n\
                    + Áp dụng khi mua trực tiếp tại quầy. \n\
                    + Chương trình có thể kết thúc trước thời hạn nếu số lượng khách mua quá đông. \n\
                    + Trong mọi trường hợp, quyết định của Draco Cinema là quyết định cuối cùng.",
    },
    "ƯU ĐÃI NGÀY TRI ÂN": {
      title: "ƯU ĐÃI NGÀY TRI ÂN",
      description: "- Từ ngày 05/05/2025, các Homies sẽ được xem phim thả ga với giá vé chỉ từ 45.000đ cho tất cả các phim 2D và được refill bắp nước 1 lần. \n\
                    - Điều kiện chương trình: \n\
                    + Áp dụng cho ngày thứ 2 ĐẦU TIÊN của mỗi tháng. \n\
                    + Áp dụng cho mọi loại ghế & suất chiếu (Không áp dụng cho suất chiếu sớm). \n\
                    + Mỗi khách hàng được áp dụng 1 lần/tháng. \n\
                    + Trong mọi trường hợp, quyết định của Draco Cinema là quyết định cuối cùng.",
    },
    "ƯU ĐÃI THÀNH VIÊN": {
      title: "ƯU ĐÃI THÀNH VIÊN",
      description: "- Các Homies hãy tạo thẻ thành viên để nhận nhiều ưu đãi nháaa. \n\
                    - Cụ thể: \n\
                    + Mỗi 5.000 đồng sẽ được quy đổi thành 1 điểm khi giao dịch. \n\
                    + Đồng giá 45.000 vé phim 2D, áp dụng từ thứ 2 đến thứ 6 khi mua vé tại quầy. \n\
                    + 500đ: 1 bắp ngọt. \n\
                    + 600đ: 1 bắp ngọt + pepsi. \n\
                    + 700đ: 1 vé xem phim. \n\
                    + 1000đ: 1 vé + bắp ngọt + pepsi. \n\
                    - Điều kiện chương trình: \n\
                    + Đem thẻ thành viên để đổi quà. Chỉ áp dụng cho vé 2D. \n\
                    + Không áp dụng vào các ngày Lễ, Tết, suất chiếu đặc biệt.",
    },
    "U22 VUI VẺ": {
      title: "U22 VUI VẺ",
      description: "- Giảm giá các combo bắp nước xuống chỉ từ 49k. \n\
                    - Cụ thể: mua ngay Combo 1 U22 đủ bắp giòn nước ngọt chỉ từ 49k. Muốn thêm phần nước, hãy chọn Combo 2 U22 chỉ từ 59k. \n\
                    - Điều kiện chương trình: \n\
                    + Dành cho khách hàng thành viên U22 (độ tuổi 13-22). \n\
                    + Áp dụng khi mua trực tiếp tại quầy. \n\
                    + Mỗi khách hàng mua tối đa 01 Combo mỗi lần. \n\
                    + Vui lòng xuất trình giấy tờ tùy thân có ngày sinh hoặc vé U22 kèm thông tin thành viên hợp lệ (thẻ thành viên, app) khi mua combo. \n\
                    + Trong mọi trường hợp, quyết định của Draco Cinema là quyết định cuối cùng.",
    },
    "QUÉT VNPAY GIẢM 10K": {
      title: "QUÉT VNPAY GIẢM 10K",
      description: "- Nhập mã VNPAYCINEMA để được giảm tới 10K khi thanh toán bằng VNPAY-QR. \n\
                    - Cụ thể: Giảm 10K cho đơn hàng từ 180K. \n\
                    - Điều kiện chương trình: \n\
                    + Mỗi khách hàng được nhập mã khuyến mãi 1 lần/tháng. \n\
                    + Thời gian áp dụng: đến hết 31.07.2025. Các ngày thứ 7 và chủ nhật hàng tuần. \n\
                    + Chương trình có thể kết thúc trước thời hạn nếu số lượng mã được phát hết. \n\
                    + VNPAY có quyền quyết định cuối cùng trong việc xét duyệt các giao dịch và số điện thoại hợp lệ để tặng mã.",
    }
  };
  
  const promoLinks = document.querySelectorAll(".ads-detail");
  const popup = document.getElementById("popup-detail");
  const popupTitle = document.getElementById("popup-title");
  const popupDescription = document.getElementById("popup-description");

  promoLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Ngăn chặn chuyển hướng

      // Lấy nội dung text chính (tên ưu đãi)
      const promoTitle = this.innerText.trim();
      const details = promoDetails[promoTitle];

      if (details) {
        popupTitle.innerText = details.title;
        popupDescription.innerText = details.description;
      } else {
        popupTitle.innerText = "Không có thông tin ưu đãi";
        popupDescription.innerText = "Thông tin chi tiết chưa được cập nhật.";
      }

      popup.style.display = "flex";
    });
  });


  // Đóng popup khi bấm ra ngoài
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }    
});
    
function resizeIframe() {
    var iframe = document.getElementById("myIframe");
    if (iframe.contentWindow.document.body) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    }
}

// Gọi hàm khi iframe tải xong
document.getElementById("myIframe").onload = resizeIframe;

// Lắng nghe sự kiện resize màn hình
window.addEventListener("resize", resizeIframe);




