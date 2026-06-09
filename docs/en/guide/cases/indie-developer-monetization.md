# Case Study: How Independent Developers Can Sell Software More Smoothly

## Background

For independent developers, the hard part is often not building the software itself, but selling it in a stable and repeatable way. Once the sales flow becomes reliable, developers can keep earning revenue and put more time back into feature improvements, bug fixes, and long-term maintenance, creating a healthier positive cycle.

This is especially true for products like plugins, scripts, and lightweight desktop tools. Distribution channels are usually fragmented: some developers post in forums, some rely on chat groups, some use video descriptions, and some connect to third-party card-selling platforms. Getting the software in front of users is not the real problem. The problem is that if payment, delivery, and activation are still handled manually, the workflow becomes inefficient and difficult to manage.

In these scenarios, a few needs usually come up again and again:

- Users should receive a license code automatically after payment
- The software should be able to validate license status directly at startup
- License codes should limit device usage so they cannot be casually forwarded and reused
- Licensing rules should stay flexible enough for monthly plans, annual plans, or one-time licenses

---

## Integration Approach

The integration cost of the License Manager SDK is relatively low. On the client side, you only need to perform a license check during startup:

```python
from license_manager import LicenseClient

client = LicenseClient(
    server_url="https://api.lm.cedar-v.com",
    api_key="your_api_key",
    product_id="your_product_id"
)

result = client.validate()
if not result.valid:
    show_activation_dialog()
```

The SDK automatically handles part of the basic workflow, including:

- Public key download
- License file download
- License parsing and validation
- Activation flow for unactivated clients
- Device binding and basic license checks

For independent developers, the benefit is straightforward: there is no need to separately handle license files, signature validation, or device binding details on your own.

---

## Licensing Strategy

In this kind of sales workflow, the licensing strategy usually does not need to be overly complex, but it does need to be practical.

For example, the system supports **starting the validity period at activation time**. This is especially useful for software distributed through forums, video descriptions, or card-selling platforms: license codes can be generated in advance, while the actual validity period starts only when the user activates the software.

The system also supports **batch creation of license codes**, which is useful when you want to generate a batch of product keys in one go and then import them into a card-selling platform or distribute them through operations staff.

![Batch creation of license codes](./images/batch-authcode.png)

---

## Working with Card-Selling Platforms

If a developer does not want to build a payment page and automated delivery page from scratch, License Manager can be used together with a third-party card-selling platform.

| Stage | Tool | Purpose |
|---|---|---|
| License management | License Manager | Create license codes, manage licensing rules, and control how many devices can be activated |
| Product sales | Card-selling platform | Display products, handle payments, and automatically deliver license codes |
| Client validation | License Manager SDK | Validate license status, handle activation, and bind devices |

A common workflow looks like this:

1. Create the product and license codes in the License Manager backend
2. Import the license codes in bulk into the card-selling platform
3. After payment, the platform automatically sends the license code to the user
4. The user enters the license code in the software to complete activation

The value of this setup is not that it makes the process look more complicated. The real value is that it connects what used to be separate steps — selling, code delivery, and activation — into a stable workflow that independent developers can maintain over time.

---

## Suitable Scenarios

This approach is a good fit for products such as:

- Game plugins or integration packs
- Desktop tools
- Small productivity software
- Industry-specific utility tools
- Lightweight software sold through communities, content platforms, or card-selling platforms

If the product itself is not high-priced, but the distribution chain is long and user acquisition channels are fragmented, this kind of licensing workflow is usually much easier to maintain than sending license codes manually.
