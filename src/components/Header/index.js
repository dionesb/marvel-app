import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { searchRequest } from '~/store/modules/search/actions';

import logo from '~/assets/logo.svg';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSearch({ search }) {
    dispatch(searchRequest(search));
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo Marvel" />
          <Link to="/">Home</Link>
        </nav>

        <Form onSubmit={handleSearch}>
          <Input name="search" type="text" placeholder="Buscar..." />
          <button type="submit">
            <MdSearch size={20} color="#fff" />
          </button>
        </Form>
      </Content>
    </Container>
  );
}
