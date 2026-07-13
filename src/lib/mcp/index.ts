import { defineMcp } from "@lovable.dev/mcp-js";
import getPricelist from "./tools/get-pricelist";
import getStoreInfo from "./tools/get-store-info";
import createOrderLink from "./tools/create-order-link";

export default defineMcp({
  name: "risqq-store-mcp",
  title: "Risqq Store MCP",
  version: "0.1.0",
  instructions:
    "Public MCP for Risqq Store — jasa joki & mabar VIP Mobile Legends. Use get_pricelist for prices, get_store_info for WhatsApp / categories / payment methods / notes, and create_order_link to build a prefilled WhatsApp order URL.",
  tools: [getPricelist, getStoreInfo, createOrderLink],
});
