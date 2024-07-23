---
title: "Hosting Options for RShiny Apps"
author: "Will Gammerdinger"
---

# Learnign Objectives

In this lesson, you will:

- Describe Shiny app hosting options
- How to upload and app to a hosting service

# App Hosting

When one develops an app, they are commonly placed on a server that makes the app accessible to a broader audience. These servers are connected to the internet and thus allow users to utilize your app globally any time of day. However, there are computaitonal needs to hosting these apps and costs associated with running the servers behind these apps. We will briefly discuss a few options that app developers have for distributing their apps. 

## Local usage

One option for distributing your app is for it to be run on people own computers (locally). If your app is small-scale, this might be a reasonable solution in order to escape fees that are associated with running a server to host your app, since this can be done for free. However, one issue with this approach is that it is sensitive to version issues. If a developer develops their app with a certain version of a iven package and the user is using a different version, there could be version incapabilities. For this reason alone, sharing apps to be run locally is not considered a great practice.

## Server Hosting

As we previously mentioned, the most common way for apps to hosted is via servers. One nice aspect of hosting an app within a server is that the version concerns of runing an app locally disappearing because the developers versions of the loaded packages are the ones that are used on the server. There are two ways that you might choose to host your apps on a server:

### HMS Research Data Visualization Platform (RDVP)

One option for hosting your Shiny apps is availible to **HMS Quad-based faculty, staff, and students** is through the [HMS Research Data Visualization Platform](https://it.hms.harvard.edu/service/research-data-visualization-platform-rdvp-pilot). Unfortunately, HSDM, HSPH, hospital affiliates, and hospital-based labs are _not_ eligible. Currently, the HMS-Research Data Visualization Platform is running a pilot program for Posit (RStudio) Connect. Users who use this option have access to an unlimited number of apps and computation hours for the duration of the pilot at no cost. This is the likely best option for people who are eligible. Uploading apps through this platforma has a few advantages:

1) Uploading apps is pretty straightforward
2) It allows you to control access to who can see/use your app. You can let anyone use it, require a login or only invite certain people to be able to use it
3) You can give it a custom URL

### Shinyapps.io

If you aren't eligible for the HMS Research Data Visualization Platform then [Shinyapps.io](https://www.shinyapps.io/) is a platform that is run by Posit for hosting Shiny apps and it is likely your next best choice. It has several different levels of access. Its lowest level of access is free and allows the developer to upload up to 5 apps and have 25 hours of computing per month. This level is recommendeded if you are new to the Shiny world. It allows you host a few apps and play around with them a bit. However, you can quickly go through the 25 hours of computational resources and it won't be too hard to create more than 5 apps. After the free level, they have higher levels service that provide the developer with more computaitonal hours and higher, or even, no limits on the number of apps. Higher levels also come with more customer services options as well.

## Serverless with Shinylive
