import React, { Component } from "react";
import ReactDOM from "react-dom";

class ProductCategoryRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    );
  }
}

class ProductRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showInStockOnly = this.props.stockOnly;
    const filterText = this.props.filterText.toLowerCase();
    /* TODO: evaluation of the products' value must go in a separate function  */
    let products = showInStockOnly
      ? this.props.products.filter(product => product.stocked)
      : this.props.products;
    if (filterText)
      products = products.filter(product =>
        product.name.toLowerCase().startsWith(filterText)
      );

    const allCategories = new Set(products.map(({ category }) => category));
    const rows = [];
    /* The code below must go in a separate function, which should return the value for the rows variable */
    allCategories.forEach(category => {
      const allCategoryProducts = products.filter(
        product => product.category === category
      );
      rows.push(<ProductCategoryRow category={category} key={category} />, [
        ...allCategoryProducts.map(product => (
          <ProductRow product={product} key={`${product.name}${category}`} />
        ))
      ]);
    });

    return (
      <table>
        <thead>
          <th>Name</th>
          <th>Price</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.inputTextValue}
          onChange={this.props.inputHandler}
        />
        <p>
          <input
            type="checkbox"
            onChange={this.props.checkBoxHandler}
            checked={this.props.checkBoxChecked}
          />{" "}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      isStockOnly: false
    };
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleTextInput(e) {
    const { value } = e.target;
    this.setState(() => ({ filterText: value }));
  }
  handleCheckboxChange(e) {
    const { checked } = e.target;
    this.setState(() => ({ isStockOnly: checked }));
  }

  render() {
    return (
      <div>
        <SearchBar
          inputTextValue={this.state.filterText}
          inputHandler={this.handleTextInput}
          checkBoxHandler={this.handleCheckboxChange}
          checkBoxChecked={this.state.isStockOnly}
        />
        <ProductTable
          products={this.props.data}
          stockOnly={this.state.isStockOnly}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  {
    category: "Electronics",
    price: "$999.99",
    stocked: false,
    name: "iPhone Xs"
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7"
  },
  {
    category: "Misc",
    price: "$5",
    stocked: true,
    name: "Teapot"
  }
];

const rootElement = document.getElementById("root");
ReactDOM.render(<FilterableProductTable data={PRODUCTS} />, rootElement);
