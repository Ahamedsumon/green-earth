


const loadAllCategories = async() => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategories(data.categories)
    
}


const displayAllCategories = (categories) => {
    const categoryListContainer = document.getElementById('category-list-container');
    
    categories.forEach(category => {
        
        // const li = document.createElement('li');
        // li.onclick
        // li.classList.add("hover:bg-[#15803D]", "transition-colors", "duration-300", "ease-in-out", "hover:text-white", "rounded-sm", "p-1")
        // li.innerHTML = `
        // <a>${category.category_name}</a>
        // `
        // categoryListContainer.append(li)
        
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="category-btn-${category.id}" onclick="loadPlantsByCategory(${category.id})" class="hover:bg-[#15803D] transition-colors duration-300 ease-in-out hover:text-white rounded-sm p-1 w-full text-left category-btns">${category.category_name}</button>
        `
        categoryListContainer.append(div)
    });
    
}

const loadAllPlants = async() =>{
    const url = "https://openapi.programming-hero.com/api/plants";
    const response = await fetch(url);
    const data = await response.json();
    displayAllPlants(data.plants)
}

const displayAllPlants = (plants) => {
    const plantCardContainer = document.getElementById('plant-card-container')
    plantCardContainer.innerHTML = '';
    plants.forEach(plant => {
        
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="$$card bg-white shadow-sm p-3 rounded-md h-full">
              <figure class="mb-2">
                <img
                  src="${plant.image}"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="$$card-body flex flex-col gap-2 ">
                <h2 class="$$card-title font-semibold text-xl text-[#1F2937]">${plant.name}</h2>
                <p class="text-[#1F2937CC]">
                  ${plant.description}
                </p>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <button class="btn rounded-full bg-[#DCFCE7] text-[#15803D] outline-none border-none">${plant.category}</button>
                  <p class="text-[#1F2937] font-semibold">৳ <span>${plant.price}</span></p>
                </div>
                <button onclick="displayCartItems('${plant.price}', '${plant.name}')" class="btn background-primary text-white rounded-full mt-2">Add to Cart</button>
              </div>
            </div>
        
        `
        plantCardContainer.append(div)
    });
}

const removeActive = () =>{
    const categoryBtns = document.querySelectorAll('.category-btns');
    categoryBtns.forEach(btn => btn.classList.remove('active'))
}


const loadPlantsByCategory = async(id) => {
    removeActive()
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const categoryBtn = document.getElementById(`category-btn-${id}`)
    categoryBtn.classList.add('active')
    displayPlantsByCategory(data.plants)
    console.log(categoryBtn);
}

const displayPlantsByCategory = (plants) => {
    displayAllPlants(plants)
}


loadAllCategories()
loadAllPlants()

// const loadCartItems = async(id) => {
//     const url = `https://openapi.programming-hero.com/api/plant/${id}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     displayCartItems(data.plants)
// }

const displayCartItems = (price, name) => {
   const cartItemsContainer = document.getElementById('cart-items-container');
    const div = document.createElement('div');
    div.innerHTML =  `
    <div class="bg-[#F0FDF4] flex justify-between items-center p-2 rounded shadow">
                <div class="">
                  <p class="pb-1 font-bold">${name}</p>
                <p><span>৳</span><span><span>${price}</span> x 1</span></p>
              </div>
              <p>X</p>
              </div>
    
    `
    cartItemsContainer.append(div)


    const cartTotalContainer = document.getElementById('cart-total-container');

    const cartAmount = document.getElementById('cart-amount');
    console.log(cartAmount);
    let convertCurrentCartAmount = parseInt(cartAmount.innerText);
    const convertToBeAddedAmount = parseInt(price);
    let finalAmount = convertCurrentCartAmount + convertToBeAddedAmount
    cartAmount.innerText= finalAmount
    cartTotalContainer.classList.remove('hidden')
}