import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

import logo from '~/assets/logo.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo Marvel" />
          <Link to="/">Home</Link>
        </nav>

        <form>
          <input type="text" placeholder="Buscar..." />
          <button type="submit">
            <MdSearch size={20} color="#fff" />
          </button>
        </form>
      </Content>
    </Container>
  );
}
