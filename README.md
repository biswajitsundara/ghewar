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

## License
This project is licensed under the MIT License. See the LICENSE file for details.


## Author

Biswajit Sundara