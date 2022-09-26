import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './EditIndicePage.css';

const EditIndicePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    // Will be "edit" or "add"
    if (props.match.params.mode === 'edit') {
      axios
        .get('https://app-osft-taicon.herokuapp.com/indices/' + this.props.match.params.id)
        .then(indiceResponse => {
          const indice = indiceResponse.data;
          setTitle(indice.name);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
        setIsLoading(false);
    }
  }, []);

  const editIndiceHandler = event => {
    event.preventDefault();
    if (
      this.state.title.trim() === '' ||
      this.state.price.trim() === '' ||
      this.state.imageUrl.trim() === '' ||
      this.state.description.trim() === ''
    ) {
      return;
    }
        setIsLoading(true);

    const indiceData = {
      name: title,
      // price: parseFloat(this.state.price),
      // image: this.state.imageUrl,
      // description: this.state.description
    };
    let request;
    if (props.match.params.mode === 'edit') {
      request = axios.patch(
        'https://app-osft-taicon.herokuapp.com/indices/' + props.match.params.id,
        indiceData
      );
    } else {
      request = axios.post('https://app-osft-taicon.herokuapp.com/indices', indiceData);
    }
    request
      .then(result => {
        setIsLoading(false);
        props.history.replace('/indices');
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        props.onError(
          'Editing or adding the indice failed. Please try again later'
        );
      });
  };

  const inputChangeHandler = (event, input) => {
    // this.setState({ [input]: event.target.value });
  };

  let content = (
      <form className="edit-indice__form" onSubmit={editIndiceHandler}>
        <Input
          label="Title"
          config={{ type: 'text', value: title }}
          onChange={event => inputChangeHandler(event, 'title')}
        />
        {/* <Input
          label="Price"
          config={{ type: 'number', value: this.state.price }}
          onChange={event => this.inputChangeHandler(event, 'price')}
        />
        <Input
          label="Image URL"
          config={{ type: 'text', value: this.state.imageUrl }}
          onChange={event => this.inputChangeHandler(event, 'imageUrl')}
        />
        <Input
          label="Description"
          elType="textarea"
          config={{ rows: '5', value: this.state.description }}
          onChange={event => this.inputChangeHandler(event, 'description')}
        /> */}
        <Button type="submit">
          {props.match.params.mode === 'add'
            ? 'Create Indice'
            : 'Update Indice'}
        </Button>
      </form>
    );
    if (this.state.isLoading) {
      content = <p>Is loading...</p>;
    }

  return (
    <main>{content}</main>
  );
};

export default EditIndicePage;