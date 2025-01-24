import React, { useState } from "react";

const Shipment = () => {
  // State to store form data
  const [shipToAddress, setShipToAddress] = useState({
    name: "Michael Smith",
    phone: "+1 555 987 6543",
    addressLine1: "456 Oak Avenue",
    addressLine2: "Suite 200",
    cityLocality: "Los Angeles",
    stateProvince: "CA",
    postalCode: "90001",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  const [packages, setPackages] = useState([
    {
      weight: { value: 5, unit: "ounce" },
      dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
    },
  ]);

  const [shipmentRates, setShipmentRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/shipengine/get-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipToAddress,
          packages,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch shipment rates");

      const data = await response.json();
      setShipmentRates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Shipment Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={shipToAddress.name}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Address Line 1</label>
          <input
            type="text"
            value={shipToAddress.addressLine1}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, addressLine1: e.target.value })
            }
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            value={shipToAddress.cityLocality}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, cityLocality: e.target.value })
            }
          />
        </div>
        <div>
          <label>State/Province</label>
          <input
            type="text"
            value={shipToAddress.stateProvince}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, stateProvince: e.target.value })
            }
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            value={shipToAddress.postalCode}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, postalCode: e.target.value })
            }
          />
        </div>
        <div>
          <label>Country Code</label>
          <input
            type="text"
            value={shipToAddress.countryCode}
            onChange={(e) =>
              setShipToAddress({ ...shipToAddress, countryCode: e.target.value })
            }
          />
        </div>
        <div>
          <label>Package Weight (oz)</label>
          <input
            type="number"
            value={packages[0].weight.value}
            onChange={(e) =>
              setPackages([
                {
                  ...packages[0],
                  weight: { ...packages[0].weight, value: parseFloat(e.target.value) },
                },
              ])
            }
          />
        </div>
        <div>
          <label>Package Length (inches)</label>
          <input
            type="number"
            value={packages[0].dimensions.length}
            onChange={(e) =>
              setPackages([
                {
                  ...packages[0],
                  dimensions: { ...packages[0].dimensions, length: parseFloat(e.target.value) },
                },
              ])
            }
          />
        </div>
        <div>
          <label>Package Width (inches)</label>
          <input
            type="number"
            value={packages[0].dimensions.width}
            onChange={(e) =>
              setPackages([
                {
                  ...packages[0],
                  dimensions: { ...packages[0].dimensions, width: parseFloat(e.target.value) },
                },
              ])
            }
          />
        </div>
        <div>
          <label>Package Height (inches)</label>
          <input
            type="number"
            value={packages[0].dimensions.height}
            onChange={(e) =>
              setPackages([
                {
                  ...packages[0],
                  dimensions: { ...packages[0].dimensions, height: parseFloat(e.target.value) },
                },
              ])
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Shipment Rates"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shipmentRates && (
        <div>
          <h3>Shipment Rates:</h3>
          <pre>{JSON.stringify(shipmentRates, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Shipment;
