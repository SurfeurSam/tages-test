// Воспользуемся методом fetch для получения данных о постах. Так как этот метод вернет нам промис, то воспольземся цепочкой методов then
fetch("http://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) => {
    // Тем же методом получим данные о юзерах
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        // Теперь мы имеем всю информацию о постах и юзерах, которую можем использовать для формирования нашего результата в переменной allUsers
        const allUsers = [];
        // Воспользуемся циклом for of, что бы получить информацию о каждом юзере
        for (const user of users) {
          const address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
          const userPosts = [];
          // Во втором цикле for of получим список постов каждого юзера. Для этого применим условие if для проверки совпадения id юзера и id поста
          for (const post of posts) {
            if (post.userId === user.id) {
              // Сздаем переменную для сокращенного заголовка поста, ориентируясь на условие не более 20 символов
              const titleCrop =
                post.title.length > 20
                  ? post.title.slice(0, 20) + "..."
                  : post.title;
              // Создаем объект, в который будем вписывать все данные о каждом посте. Каждый пост добавим в результирующий массив с постами
              // на каждой итерации второго цикла
              const userPost = {
                id: post.id,
                title: post.title,
                title_crop: titleCrop,
                body: post.body,
              };
              userPosts.push(userPost);
            }
          }
          // Создаем объект, в который будем вписывать все данные о каждом юзере. Затем добавим каждого в результирующий массив с юзерами
          // на каждой итерации первого цикла
          const oneUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            address: address,
            website: "https://" + user.website,
            company: user.company.name,
            posts: userPosts,
          };
          allUsers.push(oneUser);
        }
        // В самом конце выведем весь массив в консоль
        console.log(allUsers);
      });
  });
