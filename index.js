$(document).ready(function () {

    const apiUrl = 'http://134.0.118.99:3000/api';

    function loadSales() {
        $.get(`${apiUrl}/sales`, function (data) {
            const salesTableBody = $('#salesTableBody');
            salesTableBody.empty();

            data.slice(0, 10).forEach((sale) => {

                $.get(`${apiUrl}/products/${sale.product_id}`, function (product) {

                    $.get(`${apiUrl}/employees/${sale.employee_id}`, function (employee) {
                        salesTableBody.append(
                            `<tr>
                                <td>${product.product_name}</td>
                                <td>${employee.first_name} ${employee.last_name}</td>
                                <td>${sale.sale_date}</td>
                                <td>${sale.quantity}</td>
                            </tr>`
                        );
                    });
                });
            });
        });
    }

 function loadEmployees() {
    $.get(`${apiUrl}/employees`, function (data) {
        const employeesTableBody = $('#employeesTableBody');
        employeesTableBody.empty();

        data.forEach((employee) => {

            $.get(`${apiUrl}/branches/${employee.branch_id}`, function (branch) {
                employeesTableBody.append(
                    `<tr>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${branch.branch_name}</td>
                    </tr>`
                );
            });
        });
    });
}

    loadSales();
    loadEmployees();
});