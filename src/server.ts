import app from './app'

const server = app.listen(
  process.env.PORT || 5000, () =>
    console.log(`Server running in ${process.env.NODE_ENV}, mode on port ${process.env.PORT || 5000}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
