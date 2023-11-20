$(document).ready(function () {
    const apiUrl = 'http://134.0.118.99:3000/api';

    function loadProducts() {
        $.get(`${apiUrl}/products`, function (data) {
            const productDropdown = $('#product_id');
            const editProductDropdown = $('#editProduct');

            productDropdown.empty();
            editProductDropdown.empty();

            data.forEach((product) => {
                productDropdown.append(
                    `<option value="${product.product_id}">${product.product_name}</option>`
                );

                editProductDropdown.append(
                    `<option value="${product.product_id}">${product.product_name}</option>`
                );
            });
        });
    }

    function loadEmployees() {
        $.get(`${apiUrl}/employees`, function (data) {
            const employeeDropdown = $('#employee_id');
            const editEmployeeDropdown = $('#editEmployee');

            employeeDropdown.empty();
            editEmployeeDropdown.empty();

            data.forEach((employee) => {
                const employeeName = employee.first_name + ' ' + employee.last_name;
                employeeDropdown.append(
                    `<option value="${employee.employee_id}">${employeeName}</option>`
                );

                editEmployeeDropdown.append(
                    `<option value="${employee.employee_id}">${employeeName}</option>`
                );
            });
        });
    }

    function loadSales() {
        $.get(`${apiUrl}/sales`, function (data) {
            const salesTableBody = $('#salesTableBody');
            salesTableBody.empty();

            data.forEach((sale) => {
                $.when(
                    $.get(`${apiUrl}/employees/${sale.employee_id}`),
                    $.get(`${apiUrl}/products/${sale.product_id}`)
                ).done(function (employeeData, productData) {
                    const employee = employeeData[0];
                    const product = productData[0];

                    salesTableBody.append(
                        `<tr>
                            <td>${product.product_name}</td>
                            <td>${employee.first_name} ${employee.last_name}</td>
                            <td>${sale.sale_date}</td>
                            <td>${sale.quantity}</td>
                            <td>
                                <button class="btn btn-warning edit-sale" data-id="${sale.sale_id}">Изменить</button>
                                <button class="btn btn-danger delete-sale" data-id="${sale.sale_id}">Удалить</button>
                            </td>
                        </tr>`
                    );
                });
            });

            $(document).on('click', '.edit-sale', function () {
                const saleId = $(this).data('id');
                openEditSaleModal(saleId);
            });

            $(document).on('click', '.delete-sale', function () {
                const saleId = $(this).data('id');
                $('#confirmDelete').data('sale-id', saleId);
                $('#deleteSaleModal').modal('show');
            });
        });
    }

    function openEditSaleModal(saleId) {
        $.get(`${apiUrl}/sales/${saleId}`, function (sale) {
            $('#editProduct').val(sale.product_id);
            $('#editEmployee').val(sale.employee_id);
            $('#editSaleDate').val(sale.sale_date);
            $('#editQuantity').val(sale.quantity);
            $('#editSaleId').val(sale.sale_id);
            $('#editSaleModal').modal('show');
        });
    }

    $('#saveChangesButton').click(function () {
        const saleId = $('#editSaleId').val();
        const newProduct = $('#editProduct').val();
        const newEmployee = $('#editEmployee').val();
        const newSaleDate = $('#editSaleDate').val();
        const newQuantity = $('#editQuantity').val();

        const updatedSale = {
            product_id: newProduct,
            employee_id: newEmployee,
            sale_date: newSaleDate,
            quantity: newQuantity,
        };

        $.ajax({
            url: `${apiUrl}/sales/${saleId}`,
            method: 'PUT',
            data: JSON.stringify(updatedSale),
            contentType: 'application/json',
            success: function () {
                loadSales();
                $('#editSaleModal').modal('hide');
                showSuccessModal('Продажа успешно изменена!');
            }
        });
    });

    $('#confirmDelete').click(function () {
        const saleId = $(this).data('sale-id');
        if (saleId) {
            $.ajax({
                url: `${apiUrl}/sales/${saleId}`,
                method: 'DELETE',
                success: function () {
                    loadSales();
                    $('#deleteSaleModal').modal('hide');
                    showSuccessModal('Продажа успешно удалена!');
                }
            });
        }
    });

    $('#saleForm').submit(function (e) {
        e.preventDefault();

        const product = $('#product_id').val();
        const employee = $('#employee_id').val();
        const saleDate = $('#sale_date').val();
        const quantity = $('#quantity').val();

        const newSale = {
            product_id: product,
            employee_id: employee,
            sale_date: saleDate,
            quantity: quantity,
        };

        $.ajax({
            url: `${apiUrl}/sales`,
            method: 'POST',
            data: JSON.stringify(newSale),
            contentType: 'application/json',
            success: function () {
                loadSales();
                $('#saleForm')[0].reset();
                showSuccessModal('Продажа успешно добавлена!');
            }
        });
    });

    function showSuccessModal(message) {
        $('#successModalBody').text(message);
        $('#successModal').modal('show');
    }

    loadProducts();
    loadEmployees();
    loadSales();
});