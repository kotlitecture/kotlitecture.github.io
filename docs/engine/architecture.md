---
sidebar_position: 3
title: Architecture
---

The template generation process involves creating output structures based on a specified layer and associated features.
This process is orchestrated by the `TemplateGenerator` class, which is responsible for producing templates to an output stream.
The entire operation is driven by the `Layer` data model, representing the metadata of a specific layer with configured features and attributes.

```mermaid
graph LR
   L(Layer)
   TP(TemplateProcessor)
   TG(TemplateGenerator)
   OS(Output Structure)

   L --> TP
   TP --> TG
   TG --> OS
```

- **Layer** - Represents the metadata of a specific layer.
- **TemplateProcessor** - Prepares the template structure from the passed metadata.
- **TemplateGenerator** - Generates the template to the specified output stream.
- **Output Structure** - The resulting template streamed to the chosen output destination (File, Zip, Database, etc.).

## Layer

A layer represents a distinct aspect of your project, such as Frontend, Backend, Testing, etc.
In Kotli, even the top-level project is considered to be a layer.
This is because, in general, and in the future, it can be part of a more complex system.

 ```mermaid
 classDiagram
   direction LR
   class Layer {
      +id: String
      +name: String
      +namespace: String
      +processorId: String
      +description: String?
      +layers: List<Layer>
      +features: List<Feature>
   }

   class Feature {
      +id: String
      +attributes: Map<String, String>
   }

   Layer --|> Feature : contains
 ```

Layer attributes:
- **id** - a unique identifier to distinct this layer from others.
- **name** - represents the root folder of the generated layer.
- **namespace** - the package name, bundle id, or application id, depending on the context.
- **processorId** - the id of the processor used to resolve in the template registry.
- **description** - a brief description of the layer.
- **layers** - child layers, if applicable.
- **features** - features to be included in the layer.

Feature attributes:
- **id** - a feature identifier used to find a processor responsible for including or excluding this feature.
- **attributes** - input attributes to be used by the processor to customize the feature.

## TemplateProcessor

This class is responsible for transforming an input `Layer` into a set of rules not bound to any specific output structure.
The created set of rules is utilized by `TemplateGenerator` to construct an output structure from the given template, including only the required functionality.
Each template is associated with its own `TemplateProcessor`, and each `TemplateProcessor` **operates** exclusively with a **single template**.

```mermaid
graph TD
   class TemplateProcessor abstract
   class FeatureProcessor abstract
   class FeatureProvider abstract
   Layer
   TG["Template Generator"]
   TS["TemplateContext"]
   OS["Output Structure"]
   subgraph TemplateProcessor
      direction TB
      FP1["Feature Provider 1"]
      FPN["Feature Provider N"]
      P1["Feature Processor 1"]
      P2["Feature Processor 2"]
      PN["Feature Processor N"]
      R1["Rule 1"]
      R2["Rule 2"]
      R3["Rule 3"]
      R4["Rule 4"]
      R5["Rule 5"]
      R6["Rule 6"]
      RN["Rule N"]
      FP1 --> P1
      FP1 --> P2
      FPN --> PN
      P1 --> R1
      P1 --> R2
      P2 --> R3
      P2 --> R4
      PN --> R5
      PN --> R6
      PN --> RN
      R1 --> |apply|TS
      R2 --> |apply|TS
      R3 --> |apply|TS
      R4 --> |apply|TS
      R5 --> |apply|TS
      R6 --> |apply|TS
      RN --> |apply|TS
   end

   Layer --> TemplateProcessor
   TS --> TG
   TG --> OS
```

The high level relationships:
1. **TemplateContext**: Represents the execution context for a template.
   It retains the passed `Layer` object and accumulates a set of rules to manipulate the initial template structure.
2. **TemplateProcessor**: Responsible for processing template.
3. **FeatureProvider**: Represents a registry of feature processors with common behavior.
4. **FeatureProcessor**: Responsible for creating rules in `TemplateContext` to apply or remove a given feature in the generated structure.
5. **Rule**: Responsible for modifying some specific file in the template.

### Rule

It is an essential part of every template processor. Each rule is responsible for making specific changes to a particular file in the template.
However, it is not tied to any file it modifies. The engine implements some common rules for file manipulation,
and it is possible to create new ones with any logic to operate with template generation more powerfully.


## TemplateGenerator

The template generator is utilized to generate the necessary output structure, such as a File, Zip, Database, etc.
Usually, there's no need to create other implementations of this class.
However, the solution is designed to be flexible, allowing the creation of any other type of output structure if necessary.

```mermaid
graph TD
   class TemplateRegistry abstract
   TC1["Template Context 1"]
   TCN["Template Context N"]
   OS["Output Structure"]
   subgraph TemplateGenerator
       direction TB
       TP1["Template Processor 1"]
       TPN["Template Processor N"]
       TP1 --> TC1
       TPN --> TCN
   end

   TemplateRegistry --> TemplateGenerator
   TemplateGenerator --> OS
```

The high level relationships:
1. **TemplateRegistry**: Provides `TemplateGenerator` with all required template processors.
2. **TemplateGenerator**: Responsible for producing an output stream from passed metadata. It is associated with:
    - Creation of a `TemplateContext` from the passed `Layer`.
    - Processing metadata using set of required `TemplateProcessor`.
3. **TemplateContext**: Represents the execution context for a template.
4. **TemplateProcessor**: Responsible for processing templates.

In general, the whole template generation flow looks like this:

```mermaid
sequenceDiagram
   participant TemplateGenerator
   participant TemplateProcessor
   participant FeatureProvider
   participant FeatureProcessor
   participant TemplateContext
   participant Layer

   TemplateGenerator ->> TemplateGenerator: create TemplateContext
   TemplateGenerator ->> TemplateProcessor: process using TemplateProcessor
   TemplateProcessor ->> FeatureProvider: getProcessors
   FeatureProvider -->> TemplateProcessor: List of FeatureProcessors
   TemplateProcessor ->> FeatureProcessor: apply/remove feature
   FeatureProcessor -->> TemplateContext: onApplyFeature / onRemoveFeature
   TemplateContext -->> FeatureProcessor: Feature operation completed
   TemplateContext ->> Layer: Use Layer in operations
   TemplateGenerator ->> TemplateGenerator: prepare using TemplateContext
   TemplateContext ->> TemplateGenerator: Template generation completed
```

The Engine provides out-of-the-box implementations of generators for various output streams and purposes.

### PathOutputGenerator

This is the most common implementation, generating the output structure in the provided output folder.
By default, the target folder is set as the root directory in an in-memory file structure implementation.
It utilizes the provided TemplateRegistry to access template processors.

```mermaid
classDiagram
   class PathOutputGenerator {
      +PathOutputGenerator(output: Path, registry: TemplateRegistry)
      -output: Path
      -registry: TemplateRegistry
   }
```

### ZipOutputGenerator

This implementation consumes the output structure from the underlying generator and saves it as a zip archive into the provided output stream.

```mermaid
classDiagram
   class ZipOutputGenerator {
      +ZipOutputGenerator(output: OutputStream, generator: PathOutputGenerator)
      -output: OutputStream
      -generator: PathOutputGenerator
   }
```

### GradleProjectGenerator

This implementation consumes the output structure and proceeds with the execution of command-line commands,
treating the generated structure as a Gradle project. It executes a given set of commands as arguments for the gradlew command.
The generation process will only be considered complete after the successful execution of the provided Gradle commands.

:::warning[&nbsp;]
Keep in mind that the provided generator should produce a file structure on physical storage,
ensuring that commands can be executed properly.
:::

```mermaid
classDiagram
   class GradleProjectGenerator {
      +GradleProjectGenerator(commands: Array~String~, generator: PathOutputGenerator)
      -commands: Array~String~
      -generator: PathOutputGenerator
   }
```
