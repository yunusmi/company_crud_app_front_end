$(document).ready(function () {
    const apiUrl = 'http://134.0.118.99:3000/api';

    function loadBranches() {
        $.get(`${apiUrl}/branches`, function (data) {
            const branchDropdown = $('#branchId');
            const editBranchDropdown = $('#editBranchId');

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

    function loadEmployees() {
        $.get(`${apiUrl}/employees`, function (data) {
            const employeesTableBody = $('#employeesTableBody');
            employeesTableBody.empty();

            data.forEach((employee) => {
                employeesTableBody.append(
                    `<tr>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${employee.branch_name}</td>
                        <td>
                            <button class="btn btn-warning edit-employee" data-id="${employee.employee_id}">Изменить</button>
                            <button class="btn btn-danger delete-employee" data-id="${employee.employee_id}">Удалить</button>
                        </td>
                    </tr>`
                );
            });

            $('.edit-employee').click(function () {
                const employeeId = $(this).data('id');
                openEditEmployeeModal(employeeId);
            });

            $('.delete-employee').click(function () {
                const employeeId = $(this).data('id');
                $('#confirmDelete').data('employee-id', employeeId);
                $('#deleteEmployeeModal').modal('show');
            });
        });
    }

    function openEditEmployeeModal(employeeId) {
        $.get(`${apiUrl}/employees/${employeeId}`, function (employee) {
            $('#editFirstName').val(employee.first_name);
            $('#editLastName').val(employee.last_name);
            $('#editBranchId').val(employee.branch_id);
            $('#editEmployeeModal').data('employee-id', employee.employee_id);
            $('#editEmployeeModal').modal('show');
        });
    }

    $('#saveChangesButton').click(function () {
        const employeeId = $('#editEmployeeModal').data('employee-id');
        const newFirstName = $('#editFirstName').val();
        const newLastName = $('#editLastName').val();
        const newBranchId = $('#editBranchId').val();

        const updatedEmployee = {
            first_name: newFirstName,
            last_name: newLastName,
            branch_id: newBranchId
        };

        $.ajax({
            url: `${apiUrl}/employees/${employeeId}`,
            method: 'PUT',
            data: JSON.stringify(updatedEmployee),
            contentType: 'application/json',
            success: function () {
                loadEmployees();
                $('#editEmployeeModal').modal('hide');
                showSuccessMessage('Сотрудник успешно обновлен');
            }
        });
    });

    $('#confirmDelete').click(function () {
        const employeeId = $(this).data('employee-id');
        if (employeeId) {
            $.ajax({
                url: `${apiUrl}/employees/${employeeId}`,
                method: 'DELETE',
                success: function () {
                    loadEmployees();
                    showSuccessMessage('Сотрудник успешно удален');
                }
            });
            $('#deleteEmployeeModal').modal('hide');
        }
    });

    $('#employeeForm').submit(function (e) {
        e.preventDefault();

        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const branchId = $('#branchId').val();

        const newEmployee = {
            first_name: firstName,
            last_name: lastName,
            branch_id: branchId
        };

        $.ajax({
            url: `${apiUrl}/employees`,
            method: 'POST',
            data: JSON.stringify(newEmployee),
            contentType: 'application/json',
            success: function () {
                loadEmployees();
                $('#employeeForm')[0].reset();
                showSuccessMessage('Сотрудник успешно создан');
            }
        });
    });

    loadBranches();
    loadEmployees();

    function showSuccessMessage(message) {
        $('#successMessage').text(message);
        $('#successModal').modal('show');
    }
});