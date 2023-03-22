import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "STARTED", "SHIPPED", "CANCELLED", "COMPLETED"],
            default: "PENDING",
        },
        order_items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                count: {
                    type: Number,
                    default: 1,
                    required: true,
                    validate: {
                        validator: (num) => {
                            return num >= 1;
                        },
                        message: "{VALUE} is not integer greater than 0",
                    },
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model("Order", orderSchema);
