import json
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Returns VPN servers status for monitoring
    Args: event - HTTP request event with httpMethod
          context - execution context with request_id
    Returns: JSON with servers list and their online status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        servers: List[Dict[str, Any]] = [
            {'id': 1, 'name': 'Москва', 'country': 'RU', 'online': True, 'ping': 12},
            {'id': 2, 'name': 'Амстердам', 'country': 'NL', 'online': True, 'ping': 45},
            {'id': 3, 'name': 'Нью-Йорк', 'country': 'US', 'online': True, 'ping': 120},
            {'id': 4, 'name': 'Токио', 'country': 'JP', 'online': True, 'ping': 180},
            {'id': 5, 'name': 'Сингапур', 'country': 'SG', 'online': True, 'ping': 140},
            {'id': 6, 'name': 'Лондон', 'country': 'GB', 'online': True, 'ping': 55},
        ]
        
        online_count = sum(1 for s in servers if s['online'])
        
        result = {
            'servers': servers,
            'total': len(servers),
            'online': online_count
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
