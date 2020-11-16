import os
import uvicorn


def main():
    uvicorn.run(
        "backend.app:app",
        host=os.getenv('CHAT_HOST', '0.0.0.0'),
        port=os.getenv('CHAT_PORT', 8000),
        reload=True,
        log_level="info"
    )


if __name__ == '__main__':
    main()
