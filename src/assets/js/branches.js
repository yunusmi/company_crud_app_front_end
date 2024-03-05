$(document).ready(function () {
  const apiUrl = window.serverIp;

  function loadBranches() {
    $.get(`${apiUrl}/branches`, function (data) {
      const branchesTableBody = $('#branchesTableBody');
      branchesTableBody.empty();

      data.forEach((branch) => {
        branchesTableBody.append(
          `<tr>
                        <td>${branch.branch_name}</td>
                        <td>
                            <button class="btn btn-warning edit-branch" data-id="${branch.branch_id}">Изменить</button>
                            <button class="btn btn-danger delete-branch" data-id="${branch.branch_id}">Удалить</button>
                            <button class="btn btn-info employees-branch" data-id="${branch.branch_id}">Сотрудники</button>
                            <button class="btn btn-info products-branch" data-id="${branch.branch_id}">Товары</button>
                        </td>
                    </tr>`
        );
      });

      $('.edit-branch').click(function () {
        const branchId = $(this).data('id');
        openEditBranchModal(branchId);
      });

      $('.delete-branch').click(function () {
        const branchId = $(this).data('id');
        $('#confirmDelete').data('branch-id', branchId);
        $('#deleteBranchModal').modal('show');
      });

      $('.employees-branch').click(function () {
        const branchId = $(this).data('id');
        loadEmployeesForBranch(branchId);
      });

      $('.products-branch').click(function () {
        const branchId = $(this).data('id');
        loadProductsForBranch(branchId);
      });
    });
  }

  function openEditBranchModal(branchId) {
    $.get(`${apiUrl}/branches/${branchId}`, function (branch) {
      $('#editBranchName').val(branch.branch_name);
      $('#editBranchId').val(branch.branch_id);
      $('#editBranchModal').modal('show');
    });
  }

  function showSuccessModal(message) {
    $('#successModalMessage').text(message);
    $('#successModal').modal('show');
  }

  function loadEmployeesForBranch(branchId) {
    $.get(`${apiUrl}/branches/${branchId}/employees`, function (data) {
      const employeesTableBody = $('#employeesTableBody');
      employeesTableBody.empty();

      data.forEach((employee) => {
        employeesTableBody.append(
          `<tr>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                    </tr>`
        );
      });

      $('#employeesModal').modal('show');
    });
  }

  function loadProductsForBranch(branchId) {
    $.get(`${apiUrl}/branches/${branchId}/products`, function (data) {
      const productsTableBody = $('#productsTableBody');
      productsTableBody.empty();

      data.forEach((product) => {
        productsTableBody.append(
          `<tr>
                        <td>${product.product_name}</td>
                        <td>${product.price}</td>
                    </tr>`
        );
      });

      $('#productsModal').modal('show');
    });
  }

  $('#saveChangesButton').click(function () {
    const branchId = $('#editBranchId').val();
    const newBranchName = $('#editBranchName').val();

    const updatedBranch = {
      branch_name: newBranchName,
    };

    $.ajax({
      url: `${apiUrl}/branches/${branchId}`,
      method: 'PUT',
      data: JSON.stringify(updatedBranch),
      contentType: 'application/json',
      success: function () {
        loadBranches();
        $('#editBranchModal').modal('hide');
        showSuccessModal('Изменения сохранены успешно.');
      },
    });
  });

  $('#confirmDelete').click(function () {
    const branchId = $(this).data('branch-id');
    if (branchId) {
      $.ajax({
        url: `${apiUrl}/branches/${branchId}`,
        method: 'DELETE',
        success: function () {
          loadBranches();
          $('#deleteBranchModal').modal('hide');
          showSuccessModal('Филиал удален успешно.');
        },
      });
    }
  });

  $('#branchForm').submit(function (e) {
    e.preventDefault();

    const branchName = $('#branchName').val();

    const newBranch = {
      branch_name: branchName,
    };

    $.ajax({
      url: `${apiUrl}/branches`,
      method: 'POST',
      data: JSON.stringify(newBranch),
      contentType: 'application/json',
      success: function () {
        loadBranches();
        $('#branchForm')[0].reset();
        showSuccessModal('Филиал создан успешно.');
      },
    });
  });

  loadBranches();
});
