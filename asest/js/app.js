// adhtml start
const api_url = "https://dummyjson.com";

(async function () {
    const allProducts= await getProductlist();
    addHtml(allProducts.products)
    openProductModal();
    stopModalCOntentClick();
})();

async function getProductlist() {
    return await (await fetch(`${api_url}/products/?limit=8`)).json();
}


async function addHtml(producss) {
    
    for (let pro of producss) {
        const productModal = document.querySelector(".parent-box").parentNode.cloneNode(true);
        const parentBox = productModal.querySelector(".parent-box") 
        parentBox.setAttribute("pro-id", pro.id);
        parentBox.classList.remove("d-none")
        parentBox.querySelector(".pro-img").setAttribute("src",pro.thumbnail)
        parentBox.querySelector(".sole").innerHTML = pro.price;
        parentBox.querySelector(".text-box .blue").innerHTML = pro.title;
        document.querySelector(".product-modal .row").appendChild(productModal)
    }
}
// adhtml end 

// modal start 
async function getProductById(pId) {
    return await (await fetch(`${api_url}/products/${pId}`)).json();
}

function addModalHtml(prod) {
    const mymodal = document.getElementById("my-modal");
    const modalImg = mymodal.querySelector(".modal-img img");
    const modalProductTitle = mymodal.querySelector(".modal-product-content h4");
    const modalProductDesc = mymodal.querySelector(".modal-product-content .modal-desc");
    const modalProductPrice = mymodal.querySelector(".modal-product-content .modal-price");
    modalProductTitle.innerHTML = prod.title;
    modalProductPrice.innerHTML = prod.price;
    modalProductDesc.innerHTML = prod.description;
    modalImg.src = prod.thumbnail;
}

function openProductModal() {
    const productItems = document.querySelectorAll(".parent-box");
    for (let pro of productItems) {
        pro.onclick = async function () {
            const modal = document.getElementById("my-modal");
            modal.classList.add("modal-active")
            const productid = this.getAttribute("pro-id");
            const productInfo = await getProductById(productid);
            addModalHtml(productInfo);

        }

    }

}

function closeModal() {
    const mymodal = document.getElementById("my-modal");
    mymodal.classList.remove("modal-active");
}

function stopModalCOntentClick() {
    const modalContent = document.querySelector("#my-modal .modal-middle");

    modalContent.onclick = function (c) {
        c.stopPropagation();
        // stop propageysin
    }
}

// modal end 



