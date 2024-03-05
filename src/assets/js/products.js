$(document).ready(function () {
  const apiUrl = window.serverIp;

  function loadBranches() {
    $.get(`${apiUrl}/branches`, function (data) {
      const branchDropdown = $('#productBranchId');
      const editBranchDropdown = $('#editProductBranchId');

      branchDropdown.empty();
      editBranchDropdown.empty();

      data.forEach((branch) => {
        branchDropdown.append(
          `<option value="${branch.branch_id}">${branch.branch_name}</option>`
        );

        editBranchDropdown.append(
          `<option value="${branch.branch_id}">${branch.branch_name}</option>`
        );
      });
    });
  }

  function loadProducts() {
    $.get(`${apiUrl}/products`, function (data) {
      const productsTableBody = $('#productsTableBody');
      productsTableBody.empty();

      data.forEach((product) => {
        $.get(`${apiUrl}/branches/${product.branch_id}`, function (branch) {
          productsTableBody.append(
            `<tr>
                            <td>${product.product_name}</td>
                            <td>${product.price}</td>
                            <td>${branch.branch_name}</td>
                            <td>
                                <button class="btn btn-warning edit-product" data-id="${product.product_id}">Изменить</button>
                                <button class="btn btn-danger delete-product" data-id="${product.product_id}">Удалить</button>
                            </td>
                        </tr>`
          );
        });
      });
    });
  }

  function openEditProductModal(productId) {
    $.get(`${apiUrl}/products/${productId}`, function (product) {
      $('#editProductName').val(product.product_name);
      $('#editProductPrice').val(product.price);
      $('#editProductBranchId').val(product.branch_id);
      $('#editProductModal').data('product-id', product.product_id);
      $('#editProductModal').modal('show');
    });
  }

  function showSuccessModal(message) {
    $('#successMessage').text(message);
    $('#successModal').modal('show');
  }

  $(document).on('click', '.edit-product', function () {
    const productId = $(this).data('id');
    openEditProductModal(productId);
  });

  function openEditProductModal(productId) {
    $.get(`${apiUrl}/products/${productId}`, function (product) {
      $('#editProductName').val(product.product_name);
      $('#editProductPrice').val(product.price);
      $('#editProductBranchId').val(product.branch_id);
      $('#editProductModal').data('product-id', product.product_id);
      $('#editProductModal').modal('show');
    });
  }

  $(document).on('click', '#saveChangesButton', function () {
    const productId = $('#editProductModal').data('product-id');
    const newProductName = $('#editProductName').val();
    const newProductPrice = $('#editProductPrice').val();
    const newBranchId = $('#editProductBranchId').val();

    const updatedProduct = {
      product_name: newProductName,
      price: newProductPrice,
      branch_id: newBranchId,
    };

    $.ajax({
      url: `${apiUrl}/products/${productId}`,
      method: 'PUT',
      data: JSON.stringify(updatedProduct),
      contentType: 'application/json',
      success: function () {
        loadProducts();
        $('#editProductModal').modal('hide');
        showSuccessModal('Товар успешно обновлен.');
      },
    });
  });

  $(document).on('click', '.delete-product', function () {
    const productId = $(this).data('id');
    $('#confirmDelete').data('product-id', productId);
    $('#deleteProductModal').modal('show');
  });

  $(document).on('click', '#confirmDelete', function () {
    const productId = $(this).data('product-id');
    if (productId) {
      $.ajax({
        url: `${apiUrl}/products/${productId}`,
        method: 'DELETE',
        success: function () {
          loadProducts();
          $('#deleteProductModal').modal('hide');
          showSuccessModal('Товар успешно удален.');
        },
      });
    }
  });

  $(document).on('submit', '#productForm', function (e) {
    e.preventDefault();

    const productName = $('#productName').val();
    const productPrice = $('#productPrice').val();
    const branchId = $('#productBranchId').val();

    const newProduct = {
      product_name: productName,
      price: productPrice,
      branch_id: branchId,
    };

    $.ajax({
      url: `${apiUrl}/products`,
      method: 'POST',
      data: JSON.stringify(newProduct),
      contentType: 'application/json',
      success: function () {
        loadProducts();
        $('#productForm')[0].reset();
        showSuccessModal('Товар успешно добавлен.');
      },
    });
  });

  loadBranches();
  loadProducts();
});
