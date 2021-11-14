// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
//~/Home/Dashboard
// Write your JavaScript code.

$(document).ready(function () {
    $("#tabelPokemon").DataTable({
        'ajax': {
            'url': "/Employees/GetAll",
            /*'order': [[0, 'asc']],*/
            'dataSrc': ''
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
                "data": "gender",
                "render": function (data, type, row, meta) {
                    if (row['gender'] == 0) {
                        return 'Male'
                    } else if (row['gender'] == 1) {
                        return 'Female'
                    }
                }
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
            phoneNumber: "Please enter your phone",
            birthDate: "Please enter your birth Date",
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            gender: "Please enter your gender",
            salary: "Please enter your salary",
            degree: "Please enter your degree",
            gpa: "Please enter your gpa",
            universiryId: "Please enter your university id ",
            roleId: "Please enter your role id"
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
                url: "/employees/register",
                /*headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },*/
                'type': 'POST',
                'data': {
                    entity: obj
                },
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


function getData(nik) {
    $.ajax({
        url: "/employees/get/" + nik,
        /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },*/
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var tanggal = result.birthDate.substr(0, 10);
            $('#nik').val(result.nik);
            $('#firstName').val(result.firstName);
            $('#lastName').val(result.lastName);
            $('#phoneNumber').val(result.phoneNumber);
            $('#birthDate').val(tanggal);
            $('#salary').val(result.salary);
            $('#email').val(result.email);
            if (result.gender === 0) {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#password').val(result.password);
            $('#degree').val(result.degree);
            $('#gpa').val(result.gpa);
            $('#universityId').val(result.universityId);
            $('#roleId').val(result.roleId);
            /*$('#hid').hide();*/
            /*$('#modalPokemon').modal('show');*/
            $(window).on('load', function () {
                $('#modalPokemon').modal('show');
            });

            $('#btnUpdate').show();
            $('#btnDaftar').hide();
        },
        error: function (errormessage) {
            /*alert(errormessage.responseText);*/
            swal({
                title: "FAILED",
                text: "Data tidak ditemukan!",
                icon: "error"
            })/*.then(function () {
                window.location = "https://localhost:44390/home/ajax";
            })*/;
        }
    });
    return false;
}

/*function getData(NIK) {
    /console.log(nik)/
    $.ajax({
        url: "https://localhost:44364/api/employees/register/" + NIK,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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
            if (result.result.gender === 0) {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#password').val(result.result.password);
            $('#degree').val(result.result.degree);
            $('#gpa').val(result.result.gpa);
            $('#universityId').val(result.result.universityId);
            $('#roleId').val(result.result.roleId);
            *//*$('#modalPokemon').modal('show');*//*

            $(window).on('load', function () {
                $('#modalPokemon').modal('show');
            });

            $('#btnUpdate').show();
            $('#btnDaftar').hide();
            *//*$('#hidePass').hide();
            $('#hideRow').hide();*//*

        },
        error: function (errormessage) {
            *//*alert(errormessage.responseText);*//*
            swal({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            }); *//*then(function () {
            window.location = "https://localhost:44390/home/ajax";
        }); *//*
        }
    });
return false;
}*/

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
        url: "/employees/put/" + nik,
        type: "PUT",
        data: {
            id: nik,
            entity: obj
        },
        /*contentType: "application/json;charset=utf-8",
        dataType: "json",*/
        success: function (result) {
            console.log(result);
            /*var tanggal = result.birthDate.substring(0, 10);*/
            $('#nik').val("");
            $('#firstName').val("");
            $('#lastName').val("");
            $('#phoneNumber').val("");
            $('#birthDate').val("");
            $('#salary').val("");
            $('#email').val("");
            $('#gender').val("");
            $('#gpa').val("");
            $('#universityId').val("");
            $('#roleId').val("");
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

function deleteData(nik) {
    console.log(nik)
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/Employees/Delete/" + nik,
                type: "DELETE",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    swal({
                        title: "SUCCESSED",
                        text: "Data berhasil dihapus!",
                        icon: "success"
                    }).then(function () {
                        window.location.reload();
                    });
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        } else {
            swal("Data Anda aman tidak terhapus");
        }
    });
}

/*function deleteData(NIK) {
    *//*console.log(nik);*//*
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
                *//*.then(function () {
                    window.location = "https://localhost:44390/home/ajax";
                });*//*
                *//*$('#tablePokemon').DataTable().ajax.reload();*//*
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
};*/

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44364/api/employees/gender",
        success: function (result) {
            console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                if (val.gender === 0) {
                    label.push("Male");
                } else {
                    label.push("Female");
                }
            });
            var options = {
                chart: {
                    type: 'donut'
                },
                series: series,
                labels: label,
            }
            var chart = new ApexCharts(document.querySelector("#chartgender"), options);
            chart.render();
        }
    });
});

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44364/api/employees/role",
        success: function (result) {
            console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                if (val.roleId === 1) {
                    label.push("Employee");
                } else if (val.roleId === 2){
                    label.push("Manager");
                } else if (val.roleId === 3) {
                    label.push("Director");
                } else if (val.roleId === 4) {
                    label.push("Admin");
                } else if (val.roleId === 5) {
                    label.push("User");
                } else {
                    label.push("Assistant Director");
                }
            });
            var options = {
                chart: {
                    type: 'pie'
                },
                series: series,
                labels: label,
            }
            var chart = new ApexCharts(document.querySelector("#chartRole"), options);
            chart.render();
        }
    });
});

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44364/api/employees/salary",
        success: function (result) {
            console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                /*series.push(val.salary);*/
                if (val.salary === 2000000) {
                    label.push("Rp 2.000.000");
                } else if (val.salary === 4500000) {
                    label.push("Rp 4.500.000");
                } else if (val.salary === 5000000) {
                    label.push("Rp 5.000.000");
                } else if (val.salary === 5500000) {
                    label.push("Rp 5.500.000");
                }else if (val.salary === 6000000) {
                    label.push("Rp 6.000.000");
                } else {
                    label.push("Rp 6.500.000");
                }
            });
            var options = {
                series: [{
                    name: "Value",
                    data: series
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                title: {
                    text: 'Salary',
                    align: 'Center'
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    name: "Salary",
                    categories: label
                }
            };
            /*var options = {
                chart: {
                    height: 280,
                    type: "area"
                },
                title: {
                    text: 'Salary',
                    align: 'Center'
                },
                dataLabels: {
                    enabled: false
                },
                series: [
                    {
                        name: "Value",
                        data: series
                    }
                ],
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100]
                    }
                },
                xaxis: {
                    categories: label
                }
            };*/
            /*var options = {
                chart: {
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                series: [
                    {
                        name: "Series 1",
                    }
                ],
                labels: label,
            }*/
            var chart = new ApexCharts(document.querySelector("#chartSalary"), options);
            chart.render();
        }
    });
});

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44364/api/employees/degree",
        success: function (result) {
            console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                if (val.degree === "D1") {
                    label.push("D1");
                } else if (val.degree === "D3") {
                    label.push("D3");
                } else {
                    label.push("S1");
                }
            });
            var options = {
                chart: {
                    height: 280,
                    type: "area"
                },
                title: {
                    text: 'Degree',
                    align: 'Center'
                },
                dataLabels: {
                    enabled: false
                },
                series: [
                    {
                        name: "Value",
                        data: series
                    }
                ],
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100]
                    }
                },
                xaxis: {
                    categories: label
                }
            };
            var chart = new ApexCharts(document.querySelector("#chartDegree"), options);
            chart.render();
        }
    });
});