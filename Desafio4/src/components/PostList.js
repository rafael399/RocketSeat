import React, { Component } from 'react';

import Post from './Post';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 2,
            author: {
              name: "Diego Fernandes",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
            },
            content: "A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Gabriel Lisboa",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
        },
        date: "04 Jun 2019",
        content: "Fala galera, beleza? Estou fazendo o Bootcamp GoStack da Rocketseat e está sendo muito massa! Alguém mais ai fazendo, comenta na publicação para trocarmos uma idéia.",
        comments: [
          {
            id: 4,
            author: {
              name: "Clara Lisboa",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
            },
            content: "Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e já tenho minha API dos desafios construída!"
          },
          {
            id: 5,
            author: {
              name: "Cézar Toledo",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
            },
            content: "Que maaaaassa! Estou pensando em me inscrever na próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!"
          }
        ]
      },
      {
        id: 5,
        author: {
          name: "Gabriel Lisboa",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
        },
        date: "04 Jun 2019",
        content: "Fala galera, beleza? Estou fazendo o Bootcamp GoStack da Rocketseat e está sendo muito massa! Alguém mais ai fazendo, comenta na publicação para trocarmos uma idéia.",
        comments: [
          {
            id: 6,
            author: {
              name: "Clara Lisboa",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLoCJxjsCx4irpw-bY5SwmIoNmscIoQYi08v9QslR4O8g77gW&s"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget quam diam. Vivamus iaculis sit."
          }
        ]
      }
    ]
  };

  render() {
    return (
      <>
        <ul>
          {this.state.posts.map(post => <li className="post" key={post.id}><Post data={post} /></li>)}
        </ul>
      </>
    );
  }
}

export default PostList;