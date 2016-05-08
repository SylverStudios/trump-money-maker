class ImmutableAsset {
  constructor(name, baseIncome, price, multiplier, owned) {
    this.name = name;
    this.baseIncome = baseIncome;
    this.price = price;
    this.multiplier = multiplier;
    this.owned = owned;
  }
}

export default ImmutableAsset;
