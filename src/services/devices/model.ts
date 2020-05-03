import * as mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    manufacturer: {
      required: true,
      lowercase: true,
      type: String,
    },
    model: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    display: {
      type: String,
    },
    CPU: {
      type: String,
    },
    RAM: {
      type: String,
    },
    pros: {
      type: Array,
    },
    cons: {
      type: Array,
    },
  },
);

schema.set("toJSON", {
  virtuals: true,
});

const Device = mongoose.model("devices", schema);

export async function list(query = {}) {
  return await Device.find(query, (err, results) => {
    if (err) {
      return {msg: err}
    }
    return results
  })
};

export async function addDevice(deviceData: {
  manufacturer: string,
  model: string,
  price: Number,
  display?: String,
  CPU?: String,
  RAM?: String,
  pros?: string[],
  cons?: string[],
}) {
  const device = new Device(deviceData);
  return device.save().then(result => {
    result = result.toJSON()
    delete result._id;
    delete result.__v;
    return result;
  });
};

