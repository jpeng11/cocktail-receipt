var buttonEl = document.getElementById("addMore");
var ingredientListEl = document.querySelector(".ingredientList");
var ingredientItemEl = document.createElement("div");
ingredientItemEl.className = "form-group row";
ingredientItemEl.innerHTML = `<label for="ingredient" class="col-sm-3 col-form-label"
>Ingredient</label
>
<div class="col-sm-4">
<input
  type="text"
  class="form-control"
  id="measure"
  name="measure"
  placeholder="Ex: 1 oz"
/>
</div>
<div class="col-sm-5">
<input
  type="text"
  class="form-control"
  id="ingredient"
  name="ingredient"
  placeholder="Example: Gin"
/>
</div>`;

buttonEl.addEventListener("click", function () {
  ingredientListEl.appendChild(ingredientItemEl);
});
