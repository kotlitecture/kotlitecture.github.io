"use strict";(self.webpackChunkkotli_docs=self.webpackChunkkotli_docs||[]).push([[7220],{3890:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var n=r(4848),s=r(8453);const a={sidebar_position:3,title:"Architecture"},i=void 0,o={id:"engine/architecture",title:"Architecture",description:"The template generation process involves creating output structures based on a specified layer and associated features.",source:"@site/docs/engine/architecture.md",sourceDirName:"engine",slug:"/engine/architecture",permalink:"/engine/architecture",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Architecture"},sidebar:"tutorialSidebar",previous:{title:"Get started",permalink:"/engine/get_started"},next:{title:"Template overview",permalink:"/engine/template_overview"}},l={},c=[{value:"Layer",id:"layer",level:2},{value:"TemplateProcessor",id:"templateprocessor",level:2},{value:"Rule",id:"rule",level:3},{value:"TemplateGenerator",id:"templategenerator",level:2},{value:"PathOutputGenerator",id:"pathoutputgenerator",level:3},{value:"ZipOutputGenerator",id:"zipoutputgenerator",level:3},{value:"GradleProjectGenerator",id:"gradleprojectgenerator",level:3}];function p(e){const t={code:"code",h2:"h2",h3:"h3",li:"li",mermaid:"mermaid",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["The template generation process involves creating output structures based on a specified layer and associated features.\nThis process is orchestrated by the ",(0,n.jsx)(t.code,{children:"TemplateGenerator"})," class, which is responsible for producing templates to an output stream.\nThe entire operation is driven by the ",(0,n.jsx)(t.code,{children:"Layer"})," data model, representing the metadata of a specific layer with configured features and attributes."]}),"\n",(0,n.jsx)(t.mermaid,{value:"graph LR\n   L(Layer)\n   TP(TemplateProcessor)\n   TG(TemplateGenerator)\n   OS(Output Structure)\n\n   L --\x3e TP\n   TP --\x3e TG\n   TG --\x3e OS"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Layer"})," - Represents the metadata of a specific layer."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateProcessor"})," - Prepares the template structure from the passed metadata."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateGenerator"})," - Generates the template to the specified output stream."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Output Structure"})," - The resulting template streamed to the chosen output destination (File, Zip, Database, etc.)."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"layer",children:"Layer"}),"\n",(0,n.jsx)(t.p,{children:"A layer represents a distinct aspect of your project, such as Frontend, Backend, Testing, etc.\nIn Kotli, even the top-level project is considered to be a layer.\nThis is because, in general, and in the future, it can be part of a more complex system."}),"\n",(0,n.jsx)(t.mermaid,{value:"classDiagram\n  direction LR\n  class Layer {\n     +id: String\n     +name: String\n     +namespace: String\n     +processorId: String\n     +description: String?\n     +layers: List<Layer>\n     +features: List<Feature>\n  }\n\n  class Feature {\n     +id: String\n     +attributes: Map<String, String>\n  }\n\n  Layer --|> Feature : contains"}),"\n",(0,n.jsx)(t.p,{children:"Layer attributes:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"id"})," - a unique identifier to distinct this layer from others."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"name"})," - represents the root folder of the generated layer."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"namespace"})," - the package name, bundle id, or application id, depending on the context."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"processorId"})," - the id of the processor used to resolve in the template registry."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"description"})," - a brief description of the layer."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"layers"})," - child layers, if applicable."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"features"})," - features to be included in the layer."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Feature attributes:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"id"})," - a feature identifier used to find a processor responsible for including or excluding this feature."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"attributes"})," - input attributes to be used by the processor to customize the feature."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"templateprocessor",children:"TemplateProcessor"}),"\n",(0,n.jsxs)(t.p,{children:["This class is responsible for transforming an input ",(0,n.jsx)(t.code,{children:"Layer"})," into a set of rules not bound to any specific output structure.\nThe created set of rules is utilized by ",(0,n.jsx)(t.code,{children:"TemplateGenerator"})," to construct an output structure from the given template, including only the required functionality.\nEach template is associated with its own ",(0,n.jsx)(t.code,{children:"TemplateProcessor"}),", and each ",(0,n.jsx)(t.code,{children:"TemplateProcessor"})," ",(0,n.jsx)(t.strong,{children:"operates"})," exclusively with a ",(0,n.jsx)(t.strong,{children:"single template"}),"."]}),"\n",(0,n.jsx)(t.mermaid,{value:'graph TD\n   class TemplateProcessor abstract\n   class FeatureProcessor abstract\n   class FeatureProvider abstract\n   Layer\n   TG["Template Generator"]\n   TS["TemplateContext"]\n   OS["Output Structure"]\n   subgraph TemplateProcessor\n      direction TB\n      FP1["Feature Provider 1"]\n      FPN["Feature Provider N"]\n      P1["Feature Processor 1"]\n      P2["Feature Processor 2"]\n      PN["Feature Processor N"]\n      R1["Rule 1"]\n      R2["Rule 2"]\n      R3["Rule 3"]\n      R4["Rule 4"]\n      R5["Rule 5"]\n      R6["Rule 6"]\n      RN["Rule N"]\n      FP1 --\x3e P1\n      FP1 --\x3e P2\n      FPN --\x3e PN\n      P1 --\x3e R1\n      P1 --\x3e R2\n      P2 --\x3e R3\n      P2 --\x3e R4\n      PN --\x3e R5\n      PN --\x3e R6\n      PN --\x3e RN\n      R1 --\x3e |apply|TS\n      R2 --\x3e |apply|TS\n      R3 --\x3e |apply|TS\n      R4 --\x3e |apply|TS\n      R5 --\x3e |apply|TS\n      R6 --\x3e |apply|TS\n      RN --\x3e |apply|TS\n   end\n\n   Layer --\x3e TemplateProcessor\n   TS --\x3e TG\n   TG --\x3e OS'}),"\n",(0,n.jsx)(t.p,{children:"The high level relationships:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateContext"}),": Represents the execution context for a template.\nIt retains the passed ",(0,n.jsx)(t.code,{children:"Layer"})," object and accumulates a set of rules to manipulate the initial template structure."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateProcessor"}),": Responsible for processing template."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"FeatureProvider"}),": Represents a registry of feature processors with common behavior."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"FeatureProcessor"}),": Responsible for creating rules in ",(0,n.jsx)(t.code,{children:"TemplateContext"})," to apply or remove a given feature in the generated structure."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Rule"}),": Responsible for modifying some specific file in the template."]}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"rule",children:"Rule"}),"\n",(0,n.jsx)(t.p,{children:"It is an essential part of every template processor. Each rule is responsible for making specific changes to a particular file in the template.\nHowever, it is not tied to any file it modifies. The engine implements some common rules for file manipulation,\nand it is possible to create new ones with any logic to operate with template generation more powerfully."}),"\n",(0,n.jsx)(t.h2,{id:"templategenerator",children:"TemplateGenerator"}),"\n",(0,n.jsx)(t.p,{children:"The template generator is utilized to generate the necessary output structure, such as a File, Zip, Database, etc.\nUsually, there's no need to create other implementations of this class.\nHowever, the solution is designed to be flexible, allowing the creation of any other type of output structure if necessary."}),"\n",(0,n.jsx)(t.mermaid,{value:'graph TD\n   class TemplateRegistry abstract\n   TC1["Template Context 1"]\n   TCN["Template Context N"]\n   OS["Output Structure"]\n   subgraph TemplateGenerator\n       direction TB\n       TP1["Template Processor 1"]\n       TPN["Template Processor N"]\n       TemplateContext --\x3e TP1\n       TemplateContext --\x3e TPN\n       TP1 --\x3e TC1\n       TPN --\x3e TCN\n   end\n\n   TemplateRegistry --\x3e TemplateGenerator\n   TemplateGenerator --\x3e OS'}),"\n",(0,n.jsx)(t.p,{children:"The high level relationships:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateRegistry"}),": Provides ",(0,n.jsx)(t.code,{children:"TemplateGenerator"})," with all required template processors."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateGenerator"}),": Responsible for producing an output stream from passed metadata. It is associated with:","\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Creation of a ",(0,n.jsx)(t.code,{children:"TemplateContext"})," from the passed ",(0,n.jsx)(t.code,{children:"Layer"}),"."]}),"\n",(0,n.jsxs)(t.li,{children:["Processing metadata using set of required ",(0,n.jsx)(t.code,{children:"TemplateProcessor"}),"."]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateContext"}),": Represents the execution context for a template."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"TemplateProcessor"}),": Responsible for processing templates."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"In general, the whole template generation flow looks like this:"}),"\n",(0,n.jsx)(t.mermaid,{value:"sequenceDiagram\n   participant TemplateGenerator\n   participant TemplateProcessor\n   participant FeatureProvider\n   participant FeatureProcessor\n   participant TemplateContext\n   participant Layer\n\n   TemplateGenerator ->> TemplateGenerator: create TemplateContext\n   TemplateGenerator ->> TemplateProcessor: process using TemplateProcessor\n   TemplateProcessor ->> FeatureProvider: getProcessors\n   FeatureProvider --\x3e> TemplateProcessor: List of FeatureProcessors\n   TemplateProcessor ->> FeatureProcessor: apply/remove feature\n   FeatureProcessor --\x3e> TemplateContext: onApplyFeature / onRemoveFeature\n   TemplateContext --\x3e> FeatureProcessor: Feature operation completed\n   TemplateContext ->> Layer: Use Layer in operations\n   TemplateGenerator ->> TemplateGenerator: prepare using TemplateContext\n   TemplateContext ->> TemplateGenerator: Template generation completed"}),"\n",(0,n.jsx)(t.p,{children:"The Engine provides out-of-the-box implementations of generators for various output streams and purposes."}),"\n",(0,n.jsx)(t.h3,{id:"pathoutputgenerator",children:"PathOutputGenerator"}),"\n",(0,n.jsx)(t.p,{children:"This is the most common implementation, generating the output structure in the provided output folder.\nBy default, the target folder is set as the root directory in an in-memory file structure implementation.\nIt utilizes the provided TemplateRegistry to access template processors."}),"\n",(0,n.jsx)(t.mermaid,{value:"classDiagram\n   class PathOutputGenerator {\n      +PathOutputGenerator(output: Path, registry: TemplateRegistry)\n      -output: Path\n      -registry: TemplateRegistry\n   }"}),"\n",(0,n.jsx)(t.h3,{id:"zipoutputgenerator",children:"ZipOutputGenerator"}),"\n",(0,n.jsx)(t.p,{children:"This implementation consumes the output structure from the underlying generator and saves it as a zip archive into the provided output stream."}),"\n",(0,n.jsx)(t.mermaid,{value:"classDiagram\n   class ZipOutputGenerator {\n      +ZipOutputGenerator(output: OutputStream, generator: PathOutputGenerator)\n      -output: OutputStream\n      -generator: PathOutputGenerator\n   }"}),"\n",(0,n.jsx)(t.h3,{id:"gradleprojectgenerator",children:"GradleProjectGenerator"}),"\n",(0,n.jsx)(t.p,{children:"This implementation consumes the output structure and proceeds with the execution of command-line commands,\ntreating the generated structure as a Gradle project. It executes a given set of commands as arguments for the gradlew command.\nThe generation process will only be considered complete after the successful execution of the provided Gradle commands."}),"\n",(0,n.jsx)(t.p,{children:"Keep in mind that the provided generator should produce a file structure on physical storage,\nensuring that commands can be executed properly."}),"\n",(0,n.jsx)(t.mermaid,{value:"classDiagram\n   class GradleProjectGenerator {\n      +GradleProjectGenerator(commands: Array~String~, generator: PathOutputGenerator)\n      -commands: Array~String~\n      -generator: PathOutputGenerator\n   }"})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}}}]);