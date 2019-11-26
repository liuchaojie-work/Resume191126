let base = {};

// 弹框
base.notice_list = document.createElement("div");
base.notice_list.classList.add("bk-notice-list");

function bk_notice(content, attr) {
    let notice_item = document.createElement("div");
    notice_item.className = "bk-notice";
    notice_item.innerHTML += "<span class='content'>" + content + "</span>";

    base.notice_list.appendChild(notice_item);

    if(!document.querySelector("body > .bk-notice-list")){document.body.appendChild(base.notice_list);}

    if(attr && attr.time){
        setTimeout(notice_remove, attr.time);
    }
    else{
        let close = document.createElement("span");
        close.className = "close";

        close.addEventListener("click", function () {
            notice_remove();
        });

        notice_item.classList.add("dismiss");
        notice_item.appendChild(close);
    }

    if(attr && attr.color){notice_item.classList.add(attr.color);}
    if(attr && attr.time && attr.overlay === true){bk_overlay({time: attr.time});}

    function notice_remove() {
        notice_item.classList.add("remove");

        setTimeout(function () {
            try{
                base.notice_list.removeChild(notice_item);
                document.querySelector("body > .bk-notice-list").removeChild(notice_item);
            }
            catch(err) {}

            if(document.querySelector("body > .bk-notice-list") && base.notice_list.childNodes.length === 0){
                document.body.removeChild(base.notice_list);
            }
        }, 300);
    }
}

// 遮罩
base.overlay = document.createElement("div");
base.overlay.classList.add("bk-overlay");

function bk_overlay(attr){
    document.body.appendChild(base.overlay);

    if(attr && attr.time){
        setTimeout(overlay_remove, attr.time);
    }
    else{
        base.overlay.addEventListener("click", function () {
            overlay_remove();
        });
    }

    if(attr && attr.code){
        base.overlay.addEventListener("click", function () {
            attr.code();
        });
    }

    function overlay_remove() {
        base.overlay.classList.add("remove");

        setTimeout(function () {
            if(document.querySelector("body > .bk-overlay")){
                base.overlay.classList.remove("remove");
                document.body.removeChild(base.overlay);
            }
        }, 300);
    }
}

// 图片放大
base.image_box = document.createElement("div");
base.image_box.className = "bk-image";
base.image_single = document.createElement("img");
base.image_box.appendChild(base.image_single);

function bk_image(selector) {
    let get_images = document.querySelectorAll(selector);

    function item(obj) {
        obj.setAttribute("bk-image", "active");
        obj.addEventListener("click", function () {
            base.image_single.src = obj.src;
            if(!document.querySelector("body > .bk-image")){
                document.body.appendChild(base.image_box);
            }
        });
    }

    for(let i = 0; i < get_images.length; i++){
        item(get_images[i]);
    }

    base.image_box.addEventListener("click", function () {
        base.image_box.classList.add("remove");
        setTimeout(function () {
            try{
                document.body.removeChild(base.image_box);
                base.image_box.classList.remove("remove");
            }
            catch (err){}
        }, 300);
    });
}

// 请保留版权说明
if (window.console && window.console.log) {
    console.log("\n %c Kico Style %c https://www.binkic.com \n\n","color: #fff; background: #3498db; padding: 5px 0;","background: #efefef; padding: 5px 0; text-decoration: none;");
}