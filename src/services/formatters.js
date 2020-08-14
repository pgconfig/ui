export const structure = configs =>
  configs[0].configuration.map(({ category, description: name }) => ({
    category,
    name,
    params: []
  }));

export const formatConfigs = configsFromBack =>
  configsFromBack.reduce((acc, { configuration: config, environment: env }) => {
    config.forEach(({ category, parameters }) => {
      const categoryFound = acc.find(it => it.category === category);

      parameters.forEach(
        ({ name: paramName, config_value: paramValue, format }) => {
          const paramAlreadyAdded = categoryFound.params.find(
            it => it.name === paramName
          );

          if (!paramAlreadyAdded) {
            categoryFound.params.push({
              name: paramName,
              [env.toLowerCase()]: paramValue,
              format
            });
          } else {
            const populatedParamIndex = categoryFound.params.findIndex(
              it => it.name === paramName
            );
            categoryFound.params[populatedParamIndex] = {
              ...categoryFound.params[populatedParamIndex],
              [env.toLowerCase()]: paramValue
            };
          }
        }
      );
    });
    return acc;
  }, structure(configsFromBack));
