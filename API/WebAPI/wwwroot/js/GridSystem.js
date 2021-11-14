// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*Tugas 1*//*
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species == "fish") {
        animals[i].class.name = "non-mamalia";
    }
}

console.log(animals);

*//*Tugas 2*//*
const cat = [];
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species == "Cat") {
        cat.push(animals[i]);
    }
}
console.log(cat);*/

/*Tugas 1*//*
for (let i = 0; i < animals.length; i++) {
    if (animals[i].species == 'fish') {
        animals[i].class.name = 'non mamalia';
    }
}
console.log(animals);

*//*Tugas 2*//*
const onlyCat = [];
for (let i = 0; i < animals.length; i++) {
    if (animals[i].species == 'Cat') {
        onlyCat.push(animals[i]);
    }
}
console.log(onlyCat);*/

var judul = document.getElementById("judul");
judul.style.backgroundColor = 'lightgreen';
judul.innerHTML = 'Diubah dengan JS';

var p = document.getElementsByTagName("p");

for (var i = 0; i < p.length; i++) {
    p[i].style.backgroundColor = 'pink';
}

var psemua = document.querySelector('#a')[2];

var psemua = document.querySelector('section#b p.b');

psemua.addEventListener("click", function () {
    psemua.innerHTML = 'Berubah!'
});

psemua.addEventListener("mouseleave", function () {
    psemua.innerHTML = 'Mouse Keluar!'
})

function panggilAllert() {
    psemua.style.backgroundcolor = "pink";
    alert("tombol di-klik menggunakan tombol!");
}

var halo = document.querySelector("div#b p#a");
halo.addEventListener("click", function () {
    halo.style.backgroundcolor = "green";
});

$("div#b p#a").click(function () {
    $("div#b p#a").css("background-color", "green");
});

var btn = document.getElementsByTagName("button")[0];
btn.addEventListener("click", function () {
    alert("Anda menakan tombol!");
});

psemua.innerHTML = 'Berubah';

$('#a').html('Berubah');



//TUGAS 


/*var grid = document.getElementById("grid");
grid.style.backgroundColor = 'lightblue';
grid.innerHTML = 'GRID dengan JS';

var semua = document.querySelector('section#b p.b');

semua.addEventListener("click", function () {
    semua.innerHTML = 'Berubah!';
});

semua.addEventListener("mouseleave", function () {
    semua.innerHTML = 'Mouse Keluar!';
});

function panggilAllert() {
*//*    semua.style.backgroundcolor = "pink";*//*
    alert("tombol di-klik menggunakan tombol!");
};


$("div#b p#a").click(function () {
    $("div#b p#a").css("background-color", "green");
});

var tugas = document.querySelector('section#a p.mb-3');

tugas.addEventListener("click", function () {
    tugas.innerHTML = 'Paragraf Dalam HTML Telah Diubah!!';
});

tugas.addEventListener("mouseleave", function () {
    semua.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius ut dolor et ornare. Fusce venenatis justo quis justo aliquet molestie. Etiam eros eros, eleifend non faucibus a, dictum non dolor. Phasellus in ex faucibus, laoreet lorem at, laoreet nisl. Morbi a sagittis massa. Nullam fringilla condimentum tempus. In sit amet rutrum orci. Cras egestas et odio quis commodo. Vestibulum sollicitudin porta risus scelerisque maximus. Ut finibus tristique posuere. Mauris facilisis auctor sodales. Duis eu turpis urna. Mauris vel lorem est. Etiam efficitur hendrerit dui, vel molestie nulla ullamcorper non. Donec mollis nisi nec sodales molestie. Morbi nunc dolor, condimentum ac pretium non, ornare congue turpis.';
});

var tugastwo = document.querySelector('section#a p.two');

tugastwo.addEventListener("click", function () {
    tugas.style.backgroundcolor = "blue";
});

<ul id="listpoke">
    <li></li>
</ul>

*/


/*$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result.results);
        var listpokemon = ""; 
        $.each(result.results, function (key, val) {
            listpokemon += `<tr>
                                <td>${key+1}</td>
                                <td>${val.name}</td>
                                <td><button type="button" class="btn btn-primary" onclick ="launchModal('${val.url}');" data-url="${val.url}" data-toggle="modal" data-target="#modalPokemon">
                                  Detail
                                </button></td>
                            </tr>`
                *//*<button class="btn btn-primary" onclick="alert('${val.url}')">Detail</button>
                 * `<li>${val.name}</li>`*//*`<tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>`*//*;
        });
        $('#tablePoke').html(listpokemon);
        *//*$('#listpoke').html(listpokemon);*//*
    }
})*/

//Using DataTables
/*$(document).ready(function () {
    $('#tabelPokemon').DataTable({
        'ajax': {
            'url': "https://swapi.dev/api/people/",
            'datatype' : 'json',
            'dataSrc': 'results'
        },
        'columns': [
            {
                "data" : "name"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['height'] + " cm";
                }
            },
            {
                "data" : "gender"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" onclick ="launchModal('${row['url']}');" data-toggle="modal" data-target="#modalPokemon">
                                Detail
                            </button >`;
                }
            }
        ]
    });
});*/

/*$(document).ready(function () {
    $("#tabelPokemon").DataTable({
        'ajax': {
            'url': "https://localhost:44364/api/employees",
            'dataSrc': 'result'
        },
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
                *//*"data": "",
                "render": function (data, type, row, meta) {
                    return "Rp " + row['salary'];
                }*//*
            },
            {
                "data": "email"
            },
            {
                "data": "gender"
            }
                *//*"render": function (toFormat) {
                    var phoneNumber;
                    phoneNumber = toFormat.toString();
                    phoneNumber = '(' + phoneNumber.substring(0, 3) + ')' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
                    return phoneNumber
                }*//*
                *//*"orderable": false,
                "render": function (data, type, row, meta) {
                    let phoneFormat = row['phoneNumber'].split('');
                    if (phoneFormat[0] == '0') {
                        phoneFormat[0] == "+62";
                        return phoneFormat.join[''];
                    }
                    return '${row.phoneNumber}';
                }*//*
                *//*"data": "phoneNumber",
                render: function (data, type, row, meta) {
                    if (row['phoneNumber'].search(0) == 0) {
                        return row['phoneNumber'].replace('0', '+62');
                    } else {
                        return row['phoneNumber'];
                    }
                }*//*
        ]
    });
});*/

/*function insert() {
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
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
    *//*console.log(obj);*//*
    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "https://localhost:44364/api/employees/register",
        type: 'POST',
        data: JSON.stringify(obj), //objek kalian
        dataType: 'json',
    }).done((result) => {
        
        swal({
            title: "Good job!",
            text: "Data Anda Berhasil Dimasukkan!",
            icon: "success",
            button: "Okey",
        });
        $("tabelPokemon").DataTable().ajax.reload();
    }).fail((error) => {
        
        swal({
            title: "Failed!",
            text: "Data Anda Gagal Dimasukkan!",
            icon: "error",
            button: "Close",
        });
    });
};*/

/*$(document).ready(function () {
    // Initialize the form validation.  Now the form can only be submitted when the user has entered all required information correctly.
    $("#formValidation").validate({
        rules: {
            "firstName": {
                required: true
            },
            "lastName": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "password": {
                required: true,
                minlength: 8
            },
            "phoneNumber": {
                required: true
            }
        },
        errorPlacement: function (error, element) { },
        highlight: function (element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-control').removeClass('is-invalid');
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
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
                    'data': JSON.stringify(obj), //objek kalian
                    'dataType': 'json',
                }).done((result) => {
                    swal({
                        title: "Good job!",
                        text: "Data Berhasil Ditambahkan!!",
                        icon: "success",
                        button: "Okey!",
                    });
                    $('#tablePokemon').DataTable().ajax.reload();
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
});*/

/*$(function () {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
});*/

/*$(document).ready(function () {.
    $("#formValidation").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
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
      *//*          console.log(obj)*//*;

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
                });
                $('#tablePokemon').DataTable().ajax.reload();
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
});*/

function update() {
    var nik = $('#nik');
    var obj = new Object();
    obj.NIK = $('#nik').val();
    obj.FirstName = $('#firstName').val();
    obj.LastName = $('#lastName').val();
    obj.Phone = $('#phoneNumber').val();
    obj.BirthDate = $('#birthDate').val();
    obj.Salary = $('#salary').val();
    obj.Email = $('#email').val();
    obj.Gender = $('#gender').val();
    console.log(obj);
    $.ajax({
        url: "https://localhost:44364/api/employees/" + nik,
        data: JSON.stringify(obj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#formModal').modal('hide');
            $('#nik').val("");
            $('#firstName').val("");
            $('#lastName').val("");
            $('#phone').val("");
            $('#birthDate').val("");
            $('#salary').val("");
            $('#email').val("");
            $('#gender').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
};

/*function delete() {
    var nik = $('#nik');
    var obj = new Object();
    obj.NIK = $('#nik').val();
    obj.FirstName = $('#firstName').val();
    obj.LastName = $('#lastName').val();
    obj.Phone = $('#phoneNumber').val();
    obj.BirthDate = $('#birthDate').val();
    obj.Salary = $('#salary').val();
    obj.Email = $('#email').val();
    obj.Gender = $('#gender').val();
    console.log(obj);
    $.ajax({
        url: "https://localhost:44364/api/employees/" + nik,
        data: JSON.stringify(obj),
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#formModal').modal('hide');
            $('#nik').val("");
            $('#firstName').val("");
            $('#lastName').val("");
            $('#phone').val("");
            $('#birthDate').val("");
            $('#salary').val("");
            $('#email').val("");
            $('#gender').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
};*/


/*$("#EmployeeForm").validate({
    rules: {
        "firstName": {
            required: true
        },
        "lastName": {
            required: true
        },
        "email": {
            required: true,
            email: true
        },
        "District": {
            required: true
        },
        "phone": {
            required: true
        }
    },
    errorPlacement: function (error, element) { },
    highlight: function (element) {
        $(element).closest('.form-control').addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).closest('.form-control').removeClass('is-invalid');
    }
});*/

/*function updateData() {
    var nik = $('#inputNIK');
    var obj = new Object();
    obj.NIK = $('#inputNIK').val();
    obj.FirstName = $('#inputFirstName').val();
    obj.LastName = $('#inputLastName').val();
    obj.Phone = $('#inputPhone').val();
    obj.BirthDate = $('#inputBirthDate').val();
    obj.Salary = $('#inputSalary').val();
    obj.Email = $('#inputEmail').val();
    obj.Gender = $('#inputGender').val();
    console.log(obj);
    $.ajax({
        url: "https://localhost:44391/API/Employees/" + nik,
        data: JSON.stringify(obj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#formModal').modal('hide');
            $('#inputNIK').val("");
            $('#inputFirstName').val("");
            $('#inputLastName').val("");
            $('#inputPhone').val("");
            $('#inputBirthDate').val("");
            $('#inputSalary').val("");
            $('#inputEmail').val("");
            $('#inputGender').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}*/

/*$.ajax({
    url: "https://localhost:44364/api/universities",
    success: function (result) {
        var optionUniv = "";
        console.log(result.result);
        $.each(result.result, function (key, val) {
            optionUniv += `
                            <option value="${val.universityId}">${val.name}</option>`;
        })
        $('#universityName').optionUniv;
    }
});

$.ajax({
    url: "https://localhost:44364/api/roles",
    success: function (result) {
        var optionRole = "";
        console.log(result.result);
        $.each(result.result, function (key, val) {
            optionRole += `
                            <option value="${val.roleId}">${val.roleName}</option>`;
        })
        $('#universityName').optionRole;
    }
});*/

/*setInterval(function () {
    table.ajax.reload();
}, 20000);*/

/*function alertPoke(url) {
    console.log("tes");
    alert(url);
}*/

/*function launchModal(url) {
    console.log(url);
    modalPokemon = "";
    $.ajax({
        url: url,
        success: function (result) {
            modalPokemon += `<div><img src ="${result.sprites.other.dream_world.front_default}"allign="" middle>
                             <p>Nama : ${result.name}</p>
                             <p>Kekuatan</p>
                            `;
            for (i = 0; i < result.abilities.length; i++) {
                modalPokemon += `<p><span class="badge badge-success">${result.abilities[i].ability.name}</span></p>`;
            }

            modalPokemon += `<p>Tipe</p>`;

            for (i = 0; i < result.types.length; i++) {
                modalPokemon += `<p><span class="badge badge-warning">${result.types[i].type.name}</span></p>`;
            }

            modalPokemon += `<p>Tinggi : <span class="badge badge-secondary">${result.height}</span></p>`;
            modalPokemon += `<p>Berat : <span class="badge badge-secondary">${result.weight}</span></p>`;

            modalPokemon += `<p>Status</p>`;

            for (i = 0; i < result.types.length; i++) {
                modalPokemon += `<p><span class="badge badge-info">${result.stats[i].base_stat}</span></p></div>`;
            }

            $('.modal-body').html(modalPokemon);
        }
    })
}*/

/*function launchModal(url) {
    console.log(url);
    modalPokemon = "";
    $.ajax({
        url: url,
        success: function (result) {
            modalPokemon += `<tr>
                             <td>${result.name}</td>
                             </button></td>
                             </tr>`;
            $('.modal-body').html(modalPokemon);
        }
    })
}*/