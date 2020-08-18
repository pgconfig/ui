export const createComparisonStructure = configs => {

  if (configs.length > 0) {
    return configs[0].configuration.map(({ category, description: name }) => ({
      category,
      name,
      params: []
    }));
  }

  return  [];
}

export const formatConfigs = configsFromBack => {

  if (configsFromBack.length <= 0) {
    return [];
  }

  return configsFromBack.reduce((acc, { configuration: config, environment: env }) => {
    config.forEach(({ category, parameters }) => {

      
      const categoryFound = acc.find(it => it.category === category);

      parameters.forEach(
        ({ name: paramName, config_value: paramValue, documentation  }) => {
          const paramAlreadyAdded = categoryFound.params.find(
            it => it.name === paramName
          );

          if (!paramAlreadyAdded) {
            categoryFound.params.push({
              name: paramName,
              [env.toLowerCase()]: paramValue,
              documentation
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
  }, createComparisonStructure(configsFromBack));
}
