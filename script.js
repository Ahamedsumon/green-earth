const isLoading = (status) => {
  const spinner = document.getElementById("spinner");
  if (status) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const loadAllCategories = async () => {
  isLoading(true);
  const url = "https://openapi.programming-hero.com/api/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayAllCategories(data.categories);
};

const displayAllCategories = (categories) => {
  const categoryListContainer = document.getElementById(
    "category-list-container",
  );

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="category-btn-${category.id}" onclick="loadPlantsByCategory(${category.id})" class="hover:bg-[#15803D] transition-colors duration-300 ease-in-out hover:text-white rounded-sm p-1 w-full text-left category-btns">${category.category_name}</button>
        `;
    categoryListContainer.append(div);
  });
};

const loadAllPlants = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const response = await fetch(url);
  const data = await response.json();
  displayAllPlants(data.plants);
};

const displayAllPlants = (plants) => {
  const plantCardContainer = document.getElementById("plant-card-container");
  plantCardContainer.innerHTML = "";
  plants.forEach((plant) => {
    const div = document.createElement("div");
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
                <h2 onclick="getPlantDetails(${plant.id})" class="$$card-title font-semibold text-xl text-[#1F2937] cursor-pointer">${plant.name}</h2>
                <p class="text-[#1F2937CC]">
                  ${plant.description}
                </p>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <button class="btn rounded-full bg-[#DCFCE7] text-[#15803D] outline-none border-none">${plant.category}</button>
                  <p class="text-[#1F2937] font-semibold">৳ <span>${plant.price}</span></p>
                </div>
                <button onclick="loadCartItems(${plant.id})" class="btn background-primary text-white rounded-full mt-2">Add to Cart</button>
              </div>
            </div>
        
        `;
    plantCardContainer.append(div);
  });
  isLoading(false);
};

const removeActive = () => {
  const categoryBtns = document.querySelectorAll(".category-btns");
  categoryBtns.forEach((btn) => btn.classList.remove("active"));
};

const loadPlantsByCategory = async (id) => {
  removeActive();
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const categoryBtn = document.getElementById(`category-btn-${id}`);
  categoryBtn.classList.add("active");
  displayPlantsByCategory(data.plants);
  console.log(categoryBtn);
};

const displayPlantsByCategory = (plants) => {
  displayAllPlants(plants);
};

loadAllCategories();
loadAllPlants();

const loadCartItems = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayCartItems(data.plants);
};

const displayCartItems = (plant) => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="bg-[#F0FDF4] flex justify-between items-center p-2 rounded shadow cart-items">
                <div class="">
                  <p class="pb-1 font-bold">${plant.name}</p>
                <p><span>৳</span><span><span>${plant.price}</span> x 1</span></p>
              </div>
              <p onclick="removeCartItems(${plant.price})" class="font-bold text-red-500">X</p>
              </div>
    
    `;
  cartItemsContainer.append(div);

  const cartTotalContainer = document.getElementById("cart-total-container");

  const cartAmount = document.getElementById("cart-amount");
  console.log(cartAmount);
  let convertCurrentCartAmount = parseInt(cartAmount.innerText);
  const convertToBeAddedAmount = parseInt(plant.price);
  let finalAmount = convertCurrentCartAmount + convertToBeAddedAmount;
  cartAmount.innerText = finalAmount;
  cartTotalContainer.classList.remove("hidden");
};

const getPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPlantDetails(data.plants);
};

const displayPlantDetails = (details) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle ">
  <div class="modal-box">
  <div class="flex flex-col justify-center items-center">
  <p class="text-xl font-bold mb-3">${details.name}</p>
    <div class="w-80 h-60 overflow-hidden object-center">
    <img src="${details.image}" alt="">
    </div>
    <p><span class="font-bold">Category:</span> <span class="text-[#1F2937CC]">${details.category}</span></p>
    <p><span class="font-bold">Price:</span> <span class="text-[#1F2937CC]">৳ ${details.price}</span></p>
    <p><span class="font-bold">Description:</span> <span class="text-[#1F2937CC]">${details.description}</span></p>
    
  </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn border-none outline-none">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
    `;
  my_modal_5.showModal();
};

const removeCartItems = (price) => {
  const cartItems = document.querySelectorAll(".cart-items");
  cartItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.target.parentNode.parentNode.remove();
    });
  });

  const cartAmount = document.getElementById("cart-amount");

  let convertCurrentCartAmount = parseInt(cartAmount.innerText);
  const convertToBeDeductedAmount = parseInt(price);
  const afterDeductedAmount =
    convertCurrentCartAmount - convertToBeDeductedAmount;
  cartAmount.innerText = afterDeductedAmount;
};
