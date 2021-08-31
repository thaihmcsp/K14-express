async function render() {
  try {
    const classList = await $.ajax({
      url: "/class",
      type: "GET",
    });
    classList.classList.map((ele) => {
      const classButton = `
      <option value="${ele._id}">${ele.className}</option>
      `;
      $(".listClass").append(classButton);
    });

    $(".listFriend").html("");
    const data = await $.ajax({
      type: "GET",
      url: "/user",
    });
    const pageSize = $("#pageSize").val();
    const totalPage = Math.ceil(data.length / pageSize);
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = `
      <button onclick='changePage(${i})'>${i}</button>
      `;
      $(".pageList").append(pageButton);
    }
    const firstPage = data.slice(0, pageSize);

    firstPage.map(function (ele) {
      const friend = `
      <div class="friend">
        <h4>${ele.username} <button onclick='changePass("${ele._id}")'>doi mat khau</button></h4>
      </div>
      `;

      $(".listFriend").append(friend);
    });
  } catch (error) {
    console.log(err);
  }
}

async function logon() {
  try {
    let username = $("#username").val();
    let password = $("#password").val();
    let age = $("#age").val();
    let className = $("#class").val();
    const res = await $.ajax({
      url: "/user/",
      type: "POST",
      data: {
        username: username,
        password: password,
        age: age,
        class: className,
      },
    });
    if (res.status === 200) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}

function changePass(id) {
  $(".changePass").css("display", "block");
  $(".btnChange").attr("onclick", `changePassword("${id}")`);
}

async function changePassword(id) {
  try {
    const username = $(".username").val();
    const password = $(".password").val();
    const newPass = $(".newPass").val();
    const confirm = $(".confirm").val();
    await $.ajax({
      url: "/user/" + id,
      type: "PUT",
      data: { username, password, newPass },
    });

    render();
  } catch (error) {
    console.log(error);
  }
}

function changeSize() {
  const pageSize = $("#pageSize").val();
  $(".pageList").html("");
  render();
}

async function changePage(page) {
  try {
    const pageSize = $("#pageSize").val();
    const classID = $(".listClass").val();
    const data = await $.ajax({
      url: `/user/pagination?page=${page}&size=${pageSize}&class=${classID}`,
      type: "GET",
    });
    $(".listFriend").html("");
    data.data.map(function (ele) {
      const friend = `
      <div class="friend">
        <h4>${ele.username} <button onclick='changePass("${ele._id}")'>doi mat khau</button></h4>
      </div>
      `;

      $(".listFriend").append(friend);
    });
  } catch (error) {
    console.log(error);
  }
}

async function changeClass() {
  try {
    const className = $(".listClass").val();
    const pageSize = $("#pageSize").val();
    const listUser = await $.ajax({
      url: `/user/pagination?class=${className}&size=${pageSize}&page=1`,
      type: "GET",
    });
    $(".listFriend").html("");
    listUser.data.map(function (ele) {
      const friend = `
      <div class="friend">
        <h4>${ele.username} <button onclick='changePass("${ele._id}")'>doi mat khau</button></h4>
      </div>
      `;

      $(".listFriend").append(friend);
    });
  } catch (error) {
    console.log(error);
  }
}
render();
