# Ghewar

![npm](https://img.shields.io/npm/v/ghewar)


## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to **Ghewar**! This library provides a collection of reusable React components designed to help you build your applications quickly and efficiently. Each component is customizable and adheres to best practices.

## Installation

You can install the library via npm:

```bash
npm install ghewar
```

## Usage

### Simple Card 
```bash
import { Button, Card, Heading } from 'ghewar'

const App = () => (
  <div>
    <Card 
        variant='secondary'
        size='medium'
        header = {<Heading level={2}>This is a sample card</Heading>}
        body = {<p>This is a sample card body text</p>}
        footer = {<Button onClick={()=>alert('Clicked OK')}>OK</Button>}
      />
  </div>
);

export default App;
```

### Complex Card 
```bash
import { Button, Card, Heading, ImageContainer, Stack } from "ghewar";
import { Product } from "./ListingPage";

const ProductCard = ({ title, price, thumbnail }: Product) => {
  return (
    <Card
      header={
        <Heading level={5} textStyle="bold">
          {title}
        </Heading>
      }
      body={
        <Stack direction="horizontal" justifyContent="space-between">
          <p>{price}</p>
          <ImageContainer src={thumbnail} alt={title} />
        </Stack>
      }
      footer={<Button onClick={() => alert("Product is added..")}>ADD</Button>}
      variant="default"
      size="medium"
    />
  );
};

export default ProductCard;
```

### Fetching data from Service 
```bash
import { DotLoader, ErrorDisplay, Stack, useFetch } from "ghewar";
import ProductCard from "./ProductCard";

export interface Product {
  id?: number;
  title: string;
  price: string;
  thumbnail: string;
}

const ListingPage = () => {
  const { data, isLoading, error } = useFetch<Product>({
    url: "https://dummyjson.com",
    endpoint: "products",
    dataKey: "products",
  });

  if (isLoading) return <DotLoader />;
  if (error) return <ErrorDisplay />;
  if (!data || data.length < 1) {
    return <p>There is no data to display..</p>;
  }

  return (
    <Stack direction="horizontal">
      {data.map((dataItem) => (
        <div key={dataItem.id}>
          <ProductCard
            title={dataItem.title}
            price={dataItem.price}
            thumbnail={dataItem.thumbnail}
          />
        </div>
      ))}
    </Stack>
  );
};

export default ListingPage;
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.


## Author

Biswajit Sundara