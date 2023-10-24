// Для решения бонусной задачи используем код из предыдущей, но немного скорректируем
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const allUsers = [];
        // Находим пользователя по имени и фамилии
        const user = users.find(user => user.name === 'Ervin Howell');
        const address = `${user.address.city}, ${user.address.street}, ${user.address.suite}`;
        const userPosts = [];
        // Получаем посты пользователя
        const userPostURL = `http://jsonplaceholder.typicode.com/posts?userId=${user.id}`;
        fetch(userPostURL)
          .then(response => response.json())
          .then(posts => {
            // Для каждого поста получаем комментарии
            for (const post of posts) {
              const titleCrop = post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title;
              const userPost = {
                id: post.id,
                title: post.title,
                title_crop: titleCrop,
                body: post.body,
                comments: []
              };
              
              const postCommentsUrl = `http://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
              fetch(postCommentsUrl)
                .then(response => response.json())
                .then(comments => {
                  userPost.comments = comments;
                });
              
              userPosts.push(userPost);
            }
            
            const finalUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              address: address,
              website: 'https://' + user.website,
              company: user.company.name,
              posts: userPosts
            };
            
            allUsers.push(finalUser);
            
            console.log(allUsers);
          });
      });
