const React = require("react");

const memoryStore = {};

function useQuery(key) {
  const [data, setData] = React.useState(memoryStore[key] || []);

  const refetch = () => {
    setData(memoryStore[key] || []);
  };

  return { data, refetch };
}

function useMutation(key, action) {
  const mutate = async (item) => {
    if (!memoryStore[key]) memoryStore[key] = [];

    if (action === "insert") {
      memoryStore[key].push(item);
    }

    if (action === "update") {
      const index = memoryStore[key].findIndex((x) => x.id === item.id);
      if (index >= 0) {
        memoryStore[key][index] = item;
      } else {
        memoryStore[key].push(item);
      }
    }

    return item;
  };

  return { mutate };
}

function useCamera() {
  return {
    takePhoto: async () => null,
    pickImage: async () => null,
  };
}

module.exports = {
  useQuery,
  useMutation,
  useCamera,
};
