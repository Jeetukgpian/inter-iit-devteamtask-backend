const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      default: null,
    },
    is_godown: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },
    sub_godown_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    image_url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", locationSchema);

const Item = mongoose.model("Item", itemSchema);

module.exports = { Location, Item };
