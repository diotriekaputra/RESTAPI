// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    $("#tabelPokemon").DataTable({
        'ajax': {
            'url': "https://localhost:44364/api/employees",
            'dataSrc': 'result'
        },
        /*dom: 'Bfrtip',*/
        buttons: [
            {
                extend: 'copyHtml5',
                name: 'copy',
                title: 'Employee',
                sheetName: 'Employee',
                text: '',
                className: 'buttonHide fa fa-copy btn-default',
                filename: 'Data',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'excelHtml5',
                name: 'excel',
                title: 'Employee',
                sheetName: 'Employee',
                text: '',
                className: 'buttonHide fa fa-download btn-default',
                filename: 'Data',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'pdfHtml5',
                name: 'pdf',
                title: 'Employee',
                sheetName: 'Employee',
                text: '',
                className: 'buttonHide fa fa-download btn-default',
                filename: 'Data',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                }
            },
            {
                extend: 'csvHtml5',
                name: 'csv',
                title: 'Employee',
                sheetName: 'Employee',
                text: '',
                className: 'buttonHide fa fa-download btn-default',
                filename: 'Data',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                }
            }
            /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        ],
        'columns': [
            {
                "data": "nik"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['firstName'] + " " + row['lastName'];
                }
            },
            {
                "data": "phoneNumber",
                "orderable": false,
                "render": function (toFormat) {
                    var tPhone;
                    tPhone = toFormat.toString();
                    subsTphone = tPhone.substring(0, 1);
                    if (subsTphone == "0") {
                        tPhone = '+62 ' + tPhone.substring(1, 4) + ' ' + tPhone.substring(4, 8) + ' ' + tPhone.substring(8, 13);
                        return tPhone
                    } else if (subsTphone == null) {
                        return tPhone
                    }
                    else {
                        tPhone =  tPhone.substring(0, 4) + ' ' + tPhone.substring(4, 8) + ' ' + tPhone.substring(8, 13);
                        return tPhone
                    }
                }
            },
            {
                "data": "birthDate",
                "render": function (date) {
                    var date;
                    date = date.toString();
                    dateTime = date.substring(0, 10);
                    return dateTime;
                }
            },
            {
                "data": "salary",
                "render": function (toFormat) {
                    var tSalary;
                    var tSalary = toFormat.toLocaleString();
                    return "Rp " + tSalary;
                }
            },
            {
                "data": "email"
            },
            {
                "data": "gender"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="getData(' + row['nik'] + ');" class="btn btn-warning text-center fa fa-edit" data-toggle="modal" href="#modalPokemon"> </button>' + ' ' +
                        '<button type="button" onclick="deleteData(' + row['nik'] + ');" class="btn btn-danger text-center fa fa-trash-alt" > </button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

$(document).ready(function () {
    $("#formValidation").validate({
        rules: {
            nik: "required",
            firstName: "required",
            lastName: "required",
            phoneNumber: "required",
            birthDate: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,

            },
            gender: "required",
            salary: "required",
            degree: "required",
            gpa: "required",
            universiryId: "required",
            roleId: "required",
        },
        messages: {
            nik: "Please enter your Nik",
            firstName: "Please enter your first Name",
            lastName: "Please enter your last Name",
            phone: "Please enter your phone",
            birthDate: "Please enter your birth Date",
            gender: "Please enter your gender",
            gender: "Please enter your gender",
            salary: "Please enter your salary",
            degree: "Please enter your degree",
            gpa: "Please enter your gpa",
            universiryId: "Please enter your universiry id ",
            roleId: "Please enter your role id",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function () {
            var obj = new Object();
            obj.NIK = $("#nik").val();
            obj.FirstName = $("#firstName").val();
            obj.LastName = $("#lastName").val();
            obj.PhoneNumber = $("#phoneNumber").val();
            obj.BirthDate = $("#birthDate").val();
            obj.Salary = $("#salary").val();
            obj.Email = $("#email").val();
            obj.Gender = $("#gender").val();
            obj.Password = $("#password").val();
            obj.Degree = $("#degree").val();
            obj.GPA = $("#gpa").val();
            obj.UniversityId = $("#universityId").val();
            obj.RoleId = $("#roleId").val();
            console.log(obj);

            $.ajax({
                url: "https://localhost:44364/api/employees/register",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'type': 'POST',
                'data': JSON.stringify(obj),
                'dataType': 'json',
            }).done((result) => {
                swal({
                    title: "Good job!",
                    text: "Data Berhasil Ditambahkan!!",
                    icon: "success",
                    button: "Okey!",
                }).then(function () {
                    window.location.reload();
                });
                $('#modalPokemon').modal('hide');
                /*$('#tablePokemon').DataTable().ajax.reload();*/
            }).fail((error) => {
                swal({
                    title: "Failed!",
                    text: "Data Gagal Dimasukan!!",
                    icon: "error",
                    button: "Close",
                });
            })
        }
    });
});

function ExportToCopy() {
    var table = $('#tabelPokemon').DataTable();
    table.buttons('copy:name').trigger();
};

function ExportToExcel() {
    var table = $('#tabelPokemon').DataTable();
    table.buttons('excel:name').trigger();
};

function ExportToPDF() {
    var table = $('#tabelPokemon').DataTable();
    table.buttons('pdf:name').trigger();
};

function ExportToCSV() {
    var table = $('#tabelPokemon').DataTable();
    table.buttons('csv:name').trigger();
};

/*function getData(NIK) {
    *//*console.log(NIK);*//*
    $.ajax({
        url: "https://localhost:44364/api/employees/register" + NIK,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result.result);
            var tanggal = result.result.birthDate.substring(0, 10);
            $('#nik').val(result.result.nik);
            $('#firstName').val(result.result.firstName);
            $('#lastName').val(result.result.lastName);
            $('#phoneNumber').val(result.result.phoneNumber);
            $('#birthDate').val(result.result.birthDate);
            $('#salary').val(result.result.salary);
            $('#email').val(result.result.email);
            if (result.result.gender === "Male") {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#gpa').val(result.result.gpa);
            $('#universityId').val(result.result.universiryId);
            $('#roleId').val(result.result.roleId);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
};*/
function getData(NIK) {
    /console.log(nik)/
    $.ajax({
        url: "https://localhost:44364/api/employees/register/" + NIK,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result.result)
            var tanggal = result.result.birthDate.substr(0, 10);
            $('#nik').val(result.result.nik);
            $('#firstName').val(result.result.firstName);
            $('#lastName').val(result.result.lastName);
            $('#phoneNumber').val(result.result.phoneNumber);
            $('#birthDate').val(tanggal);
            $('#salary').val(result.result.salary);
            $('#email').val(result.result.email);
            if (result.result.gender === "Male") {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#password').val(result.result.password);
            $('#degree').val(result.result.degree);
            $('#gpa').val(result.result.gpa);
            $('#universityId').val(result.result.universityId);
            $('#roleId').val(result.result.roleId);
            $('#modalPokemon').modal('show');
            $('#btnUpdate').show();
            $('#btnDaftar').hide();
            $('#hidePass').hide();
            $('#hideRow').hide();

        },
        error: function (errormessage) {
            /*alert(errormessage.responseText);*/
            swal({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            }); /*then(function () {
            window.location = "https://localhost:44390/home/ajax";
        }); */
        }
    });
return false;
}

function updateData() {
    var nik = $('#nik');
    var obj = new Object();
    obj.NIK = $("#nik").val();
    obj.FirstName = $("#firstName").val();
    obj.LastName = $("#lastName").val();
    obj.PhoneNumber = $("#phoneNumber").val();
    obj.BirthDate = $("#birthDate").val();
    obj.Salary = $("#salary").val();
    obj.Email = $("#email").val();
    obj.Gender = $("#gender").val();
    obj.Password = $("#password").val();
    obj.Degree = $("#degree").val();
    obj.GPA = $("#gpa").val();
    obj.UniversityId = $("#universityId").val();
    obj.RoleId = $("#roleId").val();
    /*console.log(obj);*/
    $.ajax({
        url: "https://localhost:44364/api/employees/" + nik,
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result.result);
            var tanggal = result.result.birthDate.substring(0, 10);
            $('#nik').val(result.result.nik);
            $('#firstName').val(result.result.firstName);
            $('#lastName').val(result.result.lastName);
            $('#phoneNumber').val(result.result.phoneNumber);
            $('#birthDate').val(result.result.birthDate);
            $('#salary').val(result.result.salary);
            $('#email').val(result.result.email);
            if (result.result.gender === "Male") {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#gpa').val(result.result.gpa);
            $('#universityId').val(result.result.universityId);
            $('#roleId').val(result.result.roleId);
            swal({
                    title: "Good job!",
                    text: "Data Berhasil Ditambahkan!!",
                    icon: "success",
                    button: "Okey!",
                }).then(function () {
                window.location.reload();
            });
        $('#modalPokemon').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
};

function deleteData(NIK) {
    /*console.log(nik);*/
    var del = confirm("Kamu Yakin Untuk Menghapus Data Ini?");
    if (del) {
        $.ajax({
            url: "https://localhost:44364/api/employees/" + NIK,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            dataType: "json",
            data: {"": nik},
            success: function (result) {
                swal({
                    title: "Good job!",
                    text: "Data Berhasil Dihapus!!",
                    icon: "success",
                    button: "Okey!",
                }).then(function () {
                    window.location.reload();
                });
                /*.then(function () {
                    window.location = "https://localhost:44390/home/ajax";
                });*/
                /*$('#tablePokemon').DataTable().ajax.reload();*/
            },
            error: function (errormessage) {
                swal({
                    title: "Failed!",
                    text: "Data Gagal Dihapus!!",
                    icon: "error",
                    button: "Close",
                });
            }
        });
    }
};