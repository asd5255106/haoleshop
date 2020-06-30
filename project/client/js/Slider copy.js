class Slider {
    constructor(data) {
        this.data = data;
        this.slider = null;
        this.sliderBox = null;
        this.sliderControl = null;
        this.sliderNav = null;
        this.timer = null;
        this.index = 0;
        this.len = this.data.length;
        // this.sliderBoxItemWidth = 100;
        this.init();
    }
    init() {
        this.createUI(); //1、创建标签
        //    this.setSliderItemBackgroundColor(); //2、设置背景颜色
        this.autoPlayer(); //3、自动播放
        this.addEventHandlerWithSlider();
        this.addEventHandlerWithControl();
        this.addEventHandlerWithSliderNavItem();
    }
    autoPlayer() {
        /* 核心：开启定时器，计算位移并设置标签的left */
        /* 注意：考虑临界情况 */
        this.timer = setInterval(() => {
            this.next();
            this.selectSliderNavItem(this.index);
        }, 2000);
    }
    addEventHandlerWithSlider() {
        this.slider.mouseenter(() => clearInterval(this.timer));
        this.slider.mouseleave(() => this.autoPlayer());
    }
    addEventHandlerWithControl() {
        $(".leftAr", this.slider).click(() => {
            this.prev();
            this.selectSliderNavItem(this.index)
        });

        $(".rightAr", this.slider).click(() => {
            this.next()
            this.selectSliderNavItem(this.index)
        })
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        this.sliderBox.eq(this.index).css("display", "block").siblings(".cell").css("display","none");
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        this.sliderBox.eq(this.index).css("display", "block").siblings(".cell").css("display","none");
    }
    addEventHandlerWithSliderNavItem() {
        let self = this;
        
        this.sliderNav.each((idx, item) => {
            console.log("item", item, "idx", idx)
            item.onclick = function() {
                
                console.log("+++");
                self.selectSliderNavItem(idx);
                self.index = idx;
                
                self.sliderBox.eq(idx).css("display", "block").siblings(".cell").css("display","none");
            }
        })
    }
    selectSliderNavItem(idx) {
        this.sliderNav.eq(idx).addClass("cur").siblings().removeClass("cur");
    }
    createUI() {
        let sliderBoxItem = this.data.map((item,idx) => `<div class="cell" style="${idx == 0? "display:block" : ""}">
        <div class="prom" style="background-image:${item.url};"></div>
    </div>`).join("");
        let sliderNavItem = this.data.map((item, idx) => `<i class="${idx == 0? "cur":""}"></i>
             `).join("");

        this.slider = $(`
        <div class="mainSlide" id="mainSlide">
        <div class="topslide">
            ${sliderBoxItem}
            <div class="w1200 pgWidth">
                <span class="slideNum" id="slideNum">
                    ${sliderNavItem}
                </span>
            </div>
        </div>
        <div class="sliderControl">
            <a href="javascript:;" class="leftAr" style="display: inline;"></a>
            <a href="javascript:;" class="rightAr" style="display: inline;"></a>
        </div>
        </div>`);

        $(".slide").append(this.slider);
        console.log(this.slider)
        this.sliderControl = $(".sliderControl", this.slider);
        this.sliderBox = $(".topslide .cell", this.slider);
        this.sliderNav = $(".slideNum i", this.slider);
    }
}