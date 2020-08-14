import { structure, formatConfigs } from "./formatters";

const response = {
  data: [
    {
      configuration: [
        {
          category: "memory_related",
          description: "Memory Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "shared_buffers"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "effective_cache_size"
            },
            { config_value: "20MB", format: "Bytes", name: "work_mem" },
            {
              config_value: "128MB",
              format: "Bytes",
              name: "maintenance_work_mem"
            }
          ]
        },
        {
          category: "checkpoint_related",
          description: "Checkpoint Related Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "min_wal_size"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "max_wal_size"
            },
            {
              config_value: 0.7,
              format: "Float",
              name: "checkpoint_completion_target"
            },
            { config_value: "15MB", format: "Bytes", name: "wal_buffers" }
          ]
        },
        {
          category: "network_related",
          description: "Network Related Configuration",
          parameters: [
            {
              config_value: "*",
              format: "String",
              name: "listen_addresses"
            },
            {
              config_value: 100,
              format: "Decimal",
              name: "max_connections"
            }
          ]
        },
        {
          category: "hard_drive_type",
          description: "Hard Drive Configuration",
          parameters: [
            {
              config_value: 1.1,
              format: "Float",
              name: "random_page_cost"
            },
            {
              config_value: 200,
              format: "Decimal",
              name: "effective_io_concurrency"
            }
          ]
        },
        {
          category: "worker_processes",
          description: "Worker Processes",
          parameters: [
            {
              config_value: 1,
              format: "Decimal",
              name: "max_worker_processes"
            },
            {
              config_value: 2,
              format: "Decimal",
              name: "max_parallel_workers_per_gather"
            },
            {
              config_value: 1,
              format: "Decimal",
              name: "max_parallel_workers"
            }
          ]
        }
      ],
      environment: "WEB"
    },
    {
      configuration: [
        {
          category: "memory_related",
          description: "Memory Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "shared_buffers"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "effective_cache_size"
            },
            { config_value: "20MB", format: "Bytes", name: "work_mem" },
            {
              config_value: "128MB",
              format: "Bytes",
              name: "maintenance_work_mem"
            }
          ]
        },
        {
          category: "checkpoint_related",
          description: "Checkpoint Related Configuration",
          parameters: [
            {
              config_value: "1GB",
              format: "Bytes",
              name: "min_wal_size"
            },
            {
              config_value: "3GB",
              format: "Bytes",
              name: "max_wal_size"
            },
            {
              config_value: 0.9,
              format: "Float",
              name: "checkpoint_completion_target"
            },
            { config_value: "15MB", format: "Bytes", name: "wal_buffers" }
          ]
        },
        {
          category: "network_related",
          description: "Network Related Configuration",
          parameters: [
            {
              config_value: "*",
              format: "String",
              name: "listen_addresses"
            },
            {
              config_value: 100,
              format: "Decimal",
              name: "max_connections"
            }
          ]
        },
        {
          category: "hard_drive_type",
          description: "Hard Drive Configuration",
          parameters: [
            {
              config_value: 1.1,
              format: "Float",
              name: "random_page_cost"
            },
            {
              config_value: 200,
              format: "Decimal",
              name: "effective_io_concurrency"
            }
          ]
        },
        {
          category: "worker_processes",
          description: "Worker Processes",
          parameters: [
            {
              config_value: 1,
              format: "Decimal",
              name: "max_worker_processes"
            },
            {
              config_value: 2,
              format: "Decimal",
              name: "max_parallel_workers_per_gather"
            },
            {
              config_value: 1,
              format: "Decimal",
              name: "max_parallel_workers"
            }
          ]
        }
      ],
      environment: "OLTP"
    },
    {
      configuration: [
        {
          category: "memory_related",
          description: "Memory Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "shared_buffers"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "effective_cache_size"
            },
            { config_value: "10MB", format: "Bytes", name: "work_mem" },
            {
              config_value: "256MB",
              format: "Bytes",
              name: "maintenance_work_mem"
            }
          ]
        },
        {
          category: "checkpoint_related",
          description: "Checkpoint Related Configuration",
          parameters: [
            {
              config_value: "2GB",
              format: "Bytes",
              name: "min_wal_size"
            },
            {
              config_value: "6GB",
              format: "Bytes",
              name: "max_wal_size"
            },
            {
              config_value: 0.9,
              format: "Float",
              name: "checkpoint_completion_target"
            },
            { config_value: "15MB", format: "Bytes", name: "wal_buffers" }
          ]
        },
        {
          category: "network_related",
          description: "Network Related Configuration",
          parameters: [
            {
              config_value: "*",
              format: "String",
              name: "listen_addresses"
            },
            {
              config_value: 100,
              format: "Decimal",
              name: "max_connections"
            }
          ]
        },
        {
          category: "hard_drive_type",
          description: "Hard Drive Configuration",
          parameters: [
            {
              config_value: 1.1,
              format: "Float",
              name: "random_page_cost"
            },
            {
              config_value: 200,
              format: "Decimal",
              name: "effective_io_concurrency"
            }
          ]
        },
        {
          category: "worker_processes",
          description: "Worker Processes",
          parameters: [
            {
              config_value: 1,
              format: "Decimal",
              name: "max_worker_processes"
            },
            {
              config_value: 2,
              format: "Decimal",
              name: "max_parallel_workers_per_gather"
            },
            {
              config_value: 1,
              format: "Decimal",
              name: "max_parallel_workers"
            }
          ]
        }
      ],
      environment: "DW"
    },
    {
      configuration: [
        {
          category: "memory_related",
          description: "Memory Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "shared_buffers"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "effective_cache_size"
            },
            { config_value: "10MB", format: "Bytes", name: "work_mem" },
            {
              config_value: "128MB",
              format: "Bytes",
              name: "maintenance_work_mem"
            }
          ]
        },
        {
          category: "checkpoint_related",
          description: "Checkpoint Related Configuration",
          parameters: [
            {
              config_value: "512MB",
              format: "Bytes",
              name: "min_wal_size"
            },
            {
              config_value: "2GB",
              format: "Bytes",
              name: "max_wal_size"
            },
            {
              config_value: 0.9,
              format: "Float",
              name: "checkpoint_completion_target"
            },
            { config_value: "15MB", format: "Bytes", name: "wal_buffers" }
          ]
        },
        {
          category: "network_related",
          description: "Network Related Configuration",
          parameters: [
            {
              config_value: "*",
              format: "String",
              name: "listen_addresses"
            },
            {
              config_value: 100,
              format: "Decimal",
              name: "max_connections"
            }
          ]
        },
        {
          category: "hard_drive_type",
          description: "Hard Drive Configuration",
          parameters: [
            {
              config_value: 1.1,
              format: "Float",
              name: "random_page_cost"
            },
            {
              config_value: 200,
              format: "Decimal",
              name: "effective_io_concurrency"
            }
          ]
        },
        {
          category: "worker_processes",
          description: "Worker Processes",
          parameters: [
            {
              config_value: 1,
              format: "Decimal",
              name: "max_worker_processes"
            },
            {
              config_value: 2,
              format: "Decimal",
              name: "max_parallel_workers_per_gather"
            },
            {
              config_value: 1,
              format: "Decimal",
              name: "max_parallel_workers"
            }
          ]
        }
      ],
      environment: "Mixed"
    },
    {
      configuration: [
        {
          category: "memory_related",
          description: "Memory Configuration",
          parameters: [
            {
              config_value: "128MB",
              format: "Bytes",
              name: "shared_buffers"
            },
            {
              config_value: "512MB",
              format: "Bytes",
              name: "effective_cache_size"
            },
            { config_value: "4MB", format: "Bytes", name: "work_mem" },
            {
              config_value: "128MB",
              format: "Bytes",
              name: "maintenance_work_mem"
            }
          ]
        },
        {
          category: "checkpoint_related",
          description: "Checkpoint Related Configuration",
          parameters: [
            {
              config_value: "2GB",
              format: "Bytes",
              name: "min_wal_size"
            },
            {
              config_value: "1GB",
              format: "Bytes",
              name: "max_wal_size"
            },
            {
              config_value: 0.5,
              format: "Float",
              name: "checkpoint_completion_target"
            },
            { config_value: "4MB", format: "Bytes", name: "wal_buffers" }
          ]
        },
        {
          category: "network_related",
          description: "Network Related Configuration",
          parameters: [
            {
              config_value: "*",
              format: "String",
              name: "listen_addresses"
            },
            {
              config_value: 100,
              format: "Decimal",
              name: "max_connections"
            }
          ]
        },
        {
          category: "hard_drive_type",
          description: "Hard Drive Configuration",
          parameters: [
            {
              config_value: 1.1,
              format: "Float",
              name: "random_page_cost"
            },
            {
              config_value: 200,
              format: "Decimal",
              name: "effective_io_concurrency"
            }
          ]
        },
        {
          category: "worker_processes",
          description: "Worker Processes",
          parameters: [
            {
              config_value: 1,
              format: "Decimal",
              name: "max_worker_processes"
            },
            {
              config_value: 2,
              format: "Decimal",
              name: "max_parallel_workers_per_gather"
            },
            {
              config_value: 1,
              format: "Decimal",
              name: "max_parallel_workers"
            }
          ]
        }
      ],
      environment: "Desktop"
    }
  ]
};

it("format structure", () => {
  expect(structure(response.data)).toMatchInlineSnapshot(`
    Array [
      Object {
        "category": "memory_related",
        "name": "Memory Configuration",
        "params": Array [],
      },
      Object {
        "category": "checkpoint_related",
        "name": "Checkpoint Related Configuration",
        "params": Array [],
      },
      Object {
        "category": "network_related",
        "name": "Network Related Configuration",
        "params": Array [],
      },
      Object {
        "category": "hard_drive_type",
        "name": "Hard Drive Configuration",
        "params": Array [],
      },
      Object {
        "category": "worker_processes",
        "name": "Worker Processes",
        "params": Array [],
      },
    ]
  `);
});

it("should format configs", () => {
  expect(formatConfigs(response.data)).toMatchInlineSnapshot(`
    Array [
      Object {
        "category": "memory_related",
        "name": "Memory Configuration",
        "params": Array [
          Object {
            "desktop": "128MB",
            "dw": "512MB",
            "format": "Bytes",
            "mixed": "512MB",
            "name": "shared_buffers",
            "oltp": "512MB",
            "web": "512MB",
          },
          Object {
            "desktop": "512MB",
            "dw": "2GB",
            "format": "Bytes",
            "mixed": "2GB",
            "name": "effective_cache_size",
            "oltp": "2GB",
            "web": "2GB",
          },
          Object {
            "desktop": "4MB",
            "dw": "10MB",
            "format": "Bytes",
            "mixed": "10MB",
            "name": "work_mem",
            "oltp": "20MB",
            "web": "20MB",
          },
          Object {
            "desktop": "128MB",
            "dw": "256MB",
            "format": "Bytes",
            "mixed": "128MB",
            "name": "maintenance_work_mem",
            "oltp": "128MB",
            "web": "128MB",
          },
        ],
      },
      Object {
        "category": "checkpoint_related",
        "name": "Checkpoint Related Configuration",
        "params": Array [
          Object {
            "desktop": "2GB",
            "dw": "2GB",
            "format": "Bytes",
            "mixed": "512MB",
            "name": "min_wal_size",
            "oltp": "1GB",
            "web": "512MB",
          },
          Object {
            "desktop": "1GB",
            "dw": "6GB",
            "format": "Bytes",
            "mixed": "2GB",
            "name": "max_wal_size",
            "oltp": "3GB",
            "web": "2GB",
          },
          Object {
            "desktop": 0.5,
            "dw": 0.9,
            "format": "Float",
            "mixed": 0.9,
            "name": "checkpoint_completion_target",
            "oltp": 0.9,
            "web": 0.7,
          },
          Object {
            "desktop": "4MB",
            "dw": "15MB",
            "format": "Bytes",
            "mixed": "15MB",
            "name": "wal_buffers",
            "oltp": "15MB",
            "web": "15MB",
          },
        ],
      },
      Object {
        "category": "network_related",
        "name": "Network Related Configuration",
        "params": Array [
          Object {
            "desktop": "*",
            "dw": "*",
            "format": "String",
            "mixed": "*",
            "name": "listen_addresses",
            "oltp": "*",
            "web": "*",
          },
          Object {
            "desktop": 100,
            "dw": 100,
            "format": "Decimal",
            "mixed": 100,
            "name": "max_connections",
            "oltp": 100,
            "web": 100,
          },
        ],
      },
      Object {
        "category": "hard_drive_type",
        "name": "Hard Drive Configuration",
        "params": Array [
          Object {
            "desktop": 1.1,
            "dw": 1.1,
            "format": "Float",
            "mixed": 1.1,
            "name": "random_page_cost",
            "oltp": 1.1,
            "web": 1.1,
          },
          Object {
            "desktop": 200,
            "dw": 200,
            "format": "Decimal",
            "mixed": 200,
            "name": "effective_io_concurrency",
            "oltp": 200,
            "web": 200,
          },
        ],
      },
      Object {
        "category": "worker_processes",
        "name": "Worker Processes",
        "params": Array [
          Object {
            "desktop": 1,
            "dw": 1,
            "format": "Decimal",
            "mixed": 1,
            "name": "max_worker_processes",
            "oltp": 1,
            "web": 1,
          },
          Object {
            "desktop": 2,
            "dw": 2,
            "format": "Decimal",
            "mixed": 2,
            "name": "max_parallel_workers_per_gather",
            "oltp": 2,
            "web": 2,
          },
          Object {
            "desktop": 1,
            "dw": 1,
            "format": "Decimal",
            "mixed": 1,
            "name": "max_parallel_workers",
            "oltp": 1,
            "web": 1,
          },
        ],
      },
    ]
  `);
});
