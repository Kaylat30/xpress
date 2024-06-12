//export const url: string = "https://xpresss.vercel.app";
export const url: string = "http://localhost:3000";

  
  export const loginUser = async (email: string, password: string)=> {
    try {
      const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({staffId:email,password:password}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Login error: " + error.message);
            throw error;
        }
    }
  };
  
  export const logoutUser = async (): Promise<void>=> {
    try {
      const response = await fetch(`${url}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Logout error: " + error.message);
            throw error;
        }
    }
  };
  
  export const addClient = async (name: string,address: string,contact: string,email: string)=> {
    try {
      const response = await fetch(`${url}/addClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name,contact:contact,address:address,email:email}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
      
    }
  };
  
  export const getClients = async () => {
    try {
      const response = await fetch(`${url}/getClient`)
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  export const getClientInfo = async (clientId:string) => {
    try {
      const response = await fetch(`${url}/getClientInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  
  export const deleteClient = async (clientId: string) => {
    try {
      const response = await fetch(`${url}/deleteClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  
  export const updateClient = async (clientId: string, name: string, address: string, contact: string, email: string) => {
    try {
      const response = await fetch(`${url}/updateClient`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({clientId: clientId, name: name, address: address, contact: contact, email:email }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };

  
  export const getDeliveryItems = async () => {
    try {
      const response = await fetch(`${url}/getDelivery`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };

  export const getDeliveryInfo = async (itemId:string) => {
    try {
      const response = await fetch(`${url}/getDeliveryInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  
  export const deleteDeliveryItem = async (itemId: string) => {
    try {
      const response = await fetch(`${url}/deleteDelivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId:itemId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  
  export const updateDeliveryItem = async (itemId: string, item: string, status: string, clientId: string, driverId: string, cashierIn: string, cashierOut: string) => {
    try {
      const response = await fetch(`${url}/updateDelivery`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId: itemId, item: item, status: status, clientId: clientId, driverId: driverId, cashierIn: cashierIn, cashierOut: cashierOut}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };

  
    
  export const getPackItems = async ()=> {
    try {
      const response = await fetch(`${url}/getPack`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  
  export const approvePackItem = async (itemId: string) => {
    try {
      const response = await fetch(`${url}/updatePack`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId:itemId}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
  };
  

export const addItem = async (itemId: string) => {
  try {
    const response = await fetch(`${url}/addItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getItem = async ()=> {
  try {
    const response = await fetch(`${url}/getItem`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getItemInfo = async (itemId:string) => {
  try {
    const response = await fetch(`${url}/getItemInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
      if (error instanceof Error) {
          return { success: false, error: error.message };
      }
  }
};

export const deleteItem = async (itemId: string)=> {
  try {
    const response = await fetch(`${url}/deleteItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId :itemId}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const updateItem = async (
  itemId: string,
  item: string,
  status: string,
  clientId: string,
  name: string,
  address: string,
  contact: number,
  email: string
) => {
  try {
    const response = await fetch(`${url}/updateItem`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, item, status, clientId, name, address, contact, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const checkout = async (itemId: string,price:number) => {
  try {
    const response = await fetch(`${url}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId,price }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};


export const addStaff = async (
  name: string,
  branch: string,
  sex: string,
  role: string,
  dob: string,
  contact: number,
  address: string,
  email: string
) => {
  try {
    const response = await fetch(`${url}/addStaff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, branch, sex, role, dob, contact, address, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getStaff = async () => {
  try {
    const response = await fetch(`${url}/getStaff`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getStaffInfo = async (staffId:string) => {
  try {
    const response = await fetch(`${url}/getStaffInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
      if (error instanceof Error) {
          return { success: false, error: error.message };
      }
  }
};

export const deleteStaff = async (staffId: string) => {
  try {
    const response = await fetch(`${url}/deleteStaff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const updateStaff = async (
  staffId: string,
  name: string,
  branch: string,
  sex: string,
  role: string,
  dob: string,
  contact: number,
  address: string,
  email: string
) => {
  try {
    const response = await fetch(`${url}/updateStaff`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffId, name, branch, sex, role, dob, contact, address, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};


export const addStagedItem = async (
  item: string,
  name: string,
  address: string,
  contact: number,
  email: string
) => {
  try {
    const response = await fetch(`${url}/addStagedItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item, name, address, contact, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getStagedItems = async ()=> {
  try {
    const response = await fetch(`${url}/getStagedItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }});

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const getStagedItemInfo = async (itemId:string) => {
  try {
    const response = await fetch(`${url}/getStagedItemInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
      if (error instanceof Error) {
          return { success: false, error: error.message };
      }
  }
};

export const deleteStagedItem = async (
  itemId: string,
  clientId: string
) => {
  try {
    const response = await fetch(`${url}/deleteStagedItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, clientId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};

export const updateStagedItem = async (
  itemId: string,
  item: string,
  status: string,
  clientId: string,
  name: string,
  address: string,
  contact: number,
  email: string
)=> {
  try {
    const response = await fetch(`${url}/updateStagedItem`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, item, status, clientId, name, address, contact, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
    }
};
